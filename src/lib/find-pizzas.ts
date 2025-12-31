import { prisma } from "../../prisma/prisma-client";
import { resolveSortValue } from "./sort";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  selectedValues?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => { 
    const sizes = params.sizes?.split(",").map(Number);
    const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
    const ingredientsIdArr = params.selectedValues?.split(",").map(Number);

    
    
    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;
        
    const categories = await prisma.category.findMany({
      include: {
        products: {
          orderBy: {
            id: "desc",
          },
          where: {
            ingredients: ingredientsIdArr
              ? {
                  some: {
                    id: {
                      in: ingredientsIdArr,
                    },
                  },
                }
              : undefined,
              variants: {
                  some: {
                      size: {
                          in: sizes,
                      },
                      pizzaType: {
                          in: pizzaTypes,
                      },
                      price: {
                          gte: minPrice,
                          lte: maxPrice,
                      },
                  }
              }
          },
          include: {
            ingredients: true,
            variants: {
                where: {
                    price: {
                        gte: minPrice,
                        lte: maxPrice
                    }
                },
                orderBy: {
                    price: "asc",
                },
            },
          },
        },
      },
    });

    
    
    const sortValue = resolveSortValue(params.sortBy);

    return categories.map((category) => {
      const products = [...category.products];
      const getMinPrice = (product: (typeof products)[number]) =>
        product.variants[0]?.price ?? 0;
      const getMaxPrice = (product: (typeof products)[number]) =>
        product.variants[product.variants.length - 1]?.price ?? 0;

      switch (sortValue) {
        case "price_asc":
          products.sort((a, b) => getMinPrice(a) - getMinPrice(b));
          break;
        case "price_desc":
          products.sort((a, b) => getMaxPrice(b) - getMaxPrice(a));
          break;
        case "name_asc":
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          products.sort((a, b) => b.id - a.id);
      }

      return { ...category, products };
    });
}
