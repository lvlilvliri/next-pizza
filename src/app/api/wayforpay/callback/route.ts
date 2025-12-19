import crypto from "crypto";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { prisma } from "../../../../../prisma/prisma-client";
import {
  PaymentCallbackData,
  WayforpayTransactionStatus,
} from "../../../../../@types/wayforpay";
import { sendEmail } from "@/lib";
import { CartItemDTO } from "../../../../../shared/services/dto/cart.dto";
import { OrderSuccessTemplate } from "@/components/shared/email-templates/order-success";

const MERCH_SECRET = process.env.WAYFORPAY_SECRET_KEY as string;
const MERCH_LOGIN = process.env.WAYFORPAY_MERCHANT_ACCOUNT;

const statusMap: Record<WayforpayTransactionStatus, OrderStatus> = {
  Approved: OrderStatus.IN_PROGRESS,
  Pending: OrderStatus.PENDING,
  InProcessing: OrderStatus.PENDING,
  WaitingAuthComplete: OrderStatus.PENDING,
  Declined: OrderStatus.CANCELED,
  Expired: OrderStatus.CANCELED,
  Voided: OrderStatus.CANCELED,
  RefundInProcessing: OrderStatus.CANCELED,
  Refunded: OrderStatus.CANCELED,
};

// WayForPay -> server callback (serviceUrl). Validates signature and updates order status.
export async function POST(req: Request) {
  try {
    if (!MERCH_SECRET || !MERCH_LOGIN) {
      return NextResponse.json(
        { message: "WayForPay keys are not configured" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as PaymentCallbackData;
    console.log("[WAYFORPAY CALLBACK RAW]", body);

    const stringToSign = [
      body.merchantAccount,
      body.orderReference,
      body.amount,
      body.currency,
      body.authCode ?? "",
      body.cardPan ?? "",
      body.transactionStatus,
      body.reasonCode ?? "",
    ].join(";");

    const expectedSignature = crypto
      .createHmac("md5", MERCH_SECRET)
      .update(stringToSign)
      .digest("hex");

    if (
      expectedSignature !== body.merchantSignature ||
      body.merchantAccount !== MERCH_LOGIN
    ) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }

    const orderId = Number(String(body.orderReference).split("_")[0]);
    if (!orderId) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const status =
      statusMap[body.transactionStatus as WayforpayTransactionStatus] ??
      OrderStatus.CANCELED;

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        paymentId: body.orderReference ?? null,
      },
    });

    console.log(`[WAYFORPAY CALLBACK] Order #${orderId} updated to status ${status}`);

    const order = await prisma.order.findFirst({ where: { id: orderId } });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Items are stored as serialized JSON in the DB, so parse if needed before using.
    const parsedItems =
      typeof order.items === "string"
        ? (JSON.parse(order.items) as unknown)
        : (order.items as unknown);
    const items = Array.isArray(parsedItems)
      ? (parsedItems as CartItemDTO[])
      : [];

    if (status === OrderStatus.IN_PROGRESS) {
      await sendEmail(
        order.email,
        "Next Pizza - Order successful #" + order.id,
        await OrderSuccessTemplate({
          orderId: order.id,
          totalAmount: order.totalAmount,
          items,
        })
      );
    }

    // Acknowledge WayForPay that callback was processed.
    return NextResponse.json({
      transactionStatus: "accept",
      orderReference: body.orderReference,
    });
  } catch (error) {
    console.error("[WAYFORPAY CALLBACK]", error);
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }
}
