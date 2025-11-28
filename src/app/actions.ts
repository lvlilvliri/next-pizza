'use server';

import { CheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";

import { cookies } from "next/headers";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/lib";
import { PayOrderTemplate } from "@/components/shared";

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

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            }
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            }
        });

        await sendEmail(
          data.email,
          "Next Pizza - Order Confirmation #" + newOrder.id,
          PayOrderTemplate({
            orderId: newOrder.id,
            totalAmount: newOrder.totalAmount,
            paymentUrl: `https://resend.com/docs/send-with-nextjs`,
          })
        );

        return `https://resend.com/docs/send-with-nextjs`;
            
    } catch (error) {
        console.log("[CREATE ORDER]:", error);
        throw error;
    }

   
}