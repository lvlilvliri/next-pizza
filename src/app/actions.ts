"use server";

import { CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { cookies } from "next/headers";
import { OrderStatus, Prisma } from "@prisma/client";
import crypto from "crypto";
import { PaymentData } from "../../@types/wayforpay";
import { getUserSession } from "@/lib/get-user-session";
import { hashSync } from "bcrypt";
import { sendEmail } from "@/lib/send-email";
import { VerificationTemplate } from "@/components/shared/email-templates";

const MERCH_LOGIN = process.env.WAYFORPAY_MERCHANT_ACCOUNT;
const MERCH_SECRET = process.env.WAYFORPAY_SECRET_KEY as string;
const APP_URL = "https://gold-deer-drive.loca.lt";
const API_URL = "https://gold-deer-drive.loca.lt";

console.log(API_URL, APP_URL);

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cardToken = cookieStore.get("cartToken")?.value;

    if (!cardToken) {
      throw new Error("No cart token found in cookies");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
      where: {
        token: cardToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const newOrder = await prisma.order.create({
      data: {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comments: data.note,
        totalAmount: userCart.totalAmount,
        userId: userCart.userId,
        token: cardToken,
        items: JSON.stringify(userCart.cartItems),
        status: OrderStatus.PENDING,
      },
    });

    const orderReference =
      newOrder.id.toString() + "_" + Math.floor(Date.now() / 1000);
    const orderDate = Math.floor(Date.now() / 1000).toString();
    const amount = newOrder.totalAmount.toString();
    // you can change currency to 1 uah if needed
    const currency = "UAH";
    const merchantDomainName = new URL(APP_URL).host;
    const serviceUrl = `${API_URL}/api/wayforpay/callback`;
    const returnUrl = `${APP_URL}/?paid`;

    console.log(returnUrl, serviceUrl);

    await prisma.order.update({
      where: { id: newOrder.id },
      data: { paymentId: orderReference },
    });

    const productNames = userCart.cartItems.map(
      (item) => item.productVariant.product.name,
    );
    const productCounts = userCart.cartItems.map((item) =>
      item.quantity.toString(),
    );
    const productPrices = userCart.cartItems.map((item) =>
      item.productVariant.price.toString(),
    );

    const stringToSign = [
      MERCH_LOGIN,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      currency,
      ...productNames,
      ...productCounts,
      ...productPrices,
    ].join(";");

    const signature = crypto
      .createHmac("md5", MERCH_SECRET)
      .update(stringToSign)
      .digest("hex");

    return {
      merchantAccount: MERCH_LOGIN,
      merchantDomainName,
      merchantSignature: signature,
      orderReference,
      orderDate,
      amount,
      currency,
      productName: productNames,
      productCount: productCounts,
      productPrice: productPrices,
      clientFirstName: data.firstName,
      clientLastName: data.lastName,
      clientPhone: data.phone,
      clientEmail: data.email,
      serviceUrl,
      returnUrl,
      paymentSystems: "card;googlePay",
      defaultPaymentSystem: "googlePay",
    } as PaymentData;
  } catch (error) {
    console.log("[CREATE ORDER]:", error);
    throw error;
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Not authenticated");
    }

    const findUser = await prisma.user.findFirst({
      where: { id: Number(currentUser.id) },
    });

    await prisma.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("[UPDATE USER INFO]:", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email as string },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Email not verified");
      }

      throw new Error("User already exists");
    }

    const createUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,

        password: body.password,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createUser.id,
      },
    });

    await sendEmail(
      createUser.email,
      "Next Pizza / Registration code",
      VerificationTemplate({
        code,
      }),
    );
  } catch (error) {
    console.log("[REGISTER USER]:", error);
    throw error;
  }
}
