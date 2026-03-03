import { categories, ingredients, products, stories } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { Prisma } from "@prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
  return +(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const CDN_BASE = process.env.NEXT_PUBLIC_IMAGE_CDN;

const withCdn = (url: string) => {
  if (!CDN_BASE) return url;
  return `${CDN_BASE}${encodeURIComponent(url)}`;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: Math.round(randomDecimalNumber(190, 600)),
    pizzaType,
    size,
  } as Prisma.ProductVariantUncheckedCreateInput;
};

export async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Admin test",
        email: "admin@admin.com",
        password: hashSync("admin", 10),
        verified: new Date(),
        role: "ADMIN",
      },
      {
        fullName: "User test",
        email: "user@example.com",
        password: hashSync("user", 10),
        verified: new Date(),
        role: "USER",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Pepperoni fresh",
      imageUrl: "/pepepizza.webp",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });
  const pizza2 = await prisma.product.create({
    data: {
      name: "Cheese",
      imageUrl: "/pepepizza.webp",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });
  const pizza3 = await prisma.product.create({
    data: {
      name: "Chorizo ​​fresh",
      imageUrl: "/pepepizza.webp",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productVariant.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "1111111111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productVariantId: 1,
      quantity: 2,
      ingredients: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  });

  await prisma.story.createMany({
    data: stories,
  });

  await prisma.storyItems.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://tjstakeandbakepizza.com/wp-content/uploads/2022/07/where-to-eat-pizza-by-daniel-young.jpg",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://p16-capcut-sign-useast5.capcutcdn-us.com/tos-useast5-v-2795c799-tx/o8EP3AtuIBCffQDVAoAg9YKpQCFnDkaDsQrz6s~tplv-4d650qgzx3-1:250:0.webp?lk3s=44acef4b&x-expires=1800059869&x-signature=AMPxbJ4gJr8lEgROdLBxfSAB%2F70%3D",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVbQPdwovcJ-GGjEs27YSPna8He7MS4nGPg&s",
      },
      {
        storyId: 2,
        sourceUrl:
          "https://p16-capcut-sign-useast5.capcutcdn-us.com/tos-useast5-v-2795c799-tx/o8EP3AtuIBCffQDVAoAg9YKpQCFnDkaDsQrz6s~tplv-4d650qgzx3-1:250:0.webp?lk3s=44acef4b&x-expires=1800059869&x-signature=AMPxbJ4gJr8lEgROdLBxfSAB%2F70%3D",
      },
      {
        storyId: 2,
        sourceUrl:
          "https://tjstakeandbakepizza.com/wp-content/uploads/2022/07/where-to-eat-pizza-by-daniel-young.jpg",
      },
      {
        storyId: 2,
        sourceUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVbQPdwovcJ-GGjEs27YSPna8He7MS4nGPg&s",
      },
      {
        storyId: 3,
        sourceUrl:
          "https://tjstakeandbakepizza.com/wp-content/uploads/2022/07/where-to-eat-pizza-by-daniel-young.jpg",
      },
      {
        storyId: 3,
        sourceUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVbQPdwovcJ-GGjEs27YSPna8He7MS4nGPg&s",
      },
      {
        storyId: 4,
        sourceUrl:
          "https://p16-capcut-sign-useast5.capcutcdn-us.com/tos-useast5-v-2795c799-tx/o8EP3AtuIBCffQDVAoAg9YKpQCFnDkaDsQrz6s~tplv-4d650qgzx3-1:250:0.webp?lk3s=44acef4b&x-expires=1800059869&x-signature=AMPxbJ4gJr8lEgROdLBxfSAB%2F70%3D",
      },
      {
        storyId: 5,
        sourceUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVbQPdwovcJ-GGjEs27YSPna8He7MS4nGPg&s",
      },
      {
        storyId: 5,
        sourceUrl:
          "https://tjstakeandbakepizza.com/wp-content/uploads/2022/07/where-to-eat-pizza-by-daniel-young.jpg",
      },
      {
        storyId: 5,
        sourceUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsVbQPdwovcJ-GGjEs27YSPna8He7MS4nGPg&s",
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItems" RESTART IDENTITY CASCADE`;
}
async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
