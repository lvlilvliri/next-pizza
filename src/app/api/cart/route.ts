import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import crypto from "crypto";
import { findOrCreateCart, updateCartTotalAmount } from "@/lib";
import { CreateCartItemValues } from "../../../../shared/services/dto/cart.dto";


export async function GET(req: NextRequest) {
    try {
        
        const token = req.cookies.get('cartToken')?.value;

        if(!token) {
            return NextResponse.json({totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
          where: {
            OR: [ { token: token }],
          },
          include: {
            cartItems: {
              orderBy: {
                createdAt: "desc",
              },
              include: {
                productVariant: {
                    include: {
                        product: true
                    }
                },
                ingredients: true
              },
            },
          },
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log( '[CART_GET] Server error',error)
        return NextResponse.json({message: 'Some issue when getting cart'}, {status: 500});
    }

    
    
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    if(!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients
            }
          }
          
        }
      }
    })

    if(findCartItem){
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id
        },
        data: {
          quantity: findCartItem.quantity + 1
        }
      })
      
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          ingredients: {
            connect: data.ingredients?.map((ingredients) => ({
              id: ingredients,
            })),
          },
        },
      });
    }

    

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token);

    return resp;

    
  } catch (error) {
    console.log( '[CART_POST] Server error' ,error);
    return NextResponse.json({ message: "Some issue when creating cart" }, { status: 500 });
  }
    
}