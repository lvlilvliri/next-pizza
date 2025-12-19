'use server';

import { CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { cookies } from "next/headers";
import { OrderStatus } from "@prisma/client";
import crypto from "crypto";
import { PaymentData } from "../../@types/wayforpay";


const MERCH_LOGIN = process.env.WAYFORPAY_MERCHANT_ACCOUNT;
const MERCH_SECRET = process.env.WAYFORPAY_SECRET_KEY as string;
const APP_URL = "https://gold-deer-drive.loca.lt";
const API_URL = "https://gold-deer-drive.loca.lt";

console.log(API_URL, APP_URL);

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = await cookies();
        const cardToken = cookieStore.get('cartToken')?.value;

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
                                product: true
                            }
                        },
                        ingredients: true
                    }
                }
            },
            where: {
                token: cardToken
            }
            
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
            }
        });

        // await prisma.cart.update({
        //     where: {
        //         id: userCart.id,
        //     },
        //     data: {
        //         totalAmount: 0,
        //     }
        // });

        // await prisma.cartItem.deleteMany({
        //     where: {
        //         cartId: userCart.id,
        //     }
        // });

        // await sendEmail(
        //   data.email,
        //   "Next Pizza - Order Confirmation #" + newOrder.id,
        //   PayOrderTemplate({
        //     orderId: newOrder.id,
        //     totalAmount: newOrder.totalAmount,
        //     paymentUrl: `https://resend.com/docs/send-with-nextjs`,
        //   })
        // );

        const orderReference =
          newOrder.id.toString() + "_" + Math.floor(Date.now() / 1000);
        const orderDate = Math.floor(Date.now() / 1000).toString();
        // const amount = newOrder.totalAmount.toString();
        const amount = String(1); // For testing purposes, set amount to 1 UAH
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
          (item) => item.productVariant.product.name
        );
        const productCounts = userCart.cartItems.map((item) =>
          item.quantity.toString()
        );
        const productPrices = userCart.cartItems.map((item) =>
          item.productVariant.price.toString()
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
         } as PaymentData;
            
    } catch (error) {
        console.log("[CREATE ORDER]:", error);
        throw error;
    }

   
}
