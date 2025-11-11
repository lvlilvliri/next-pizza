import { Product } from "@prisma/client";
import { axiosInstance } from "./axios-instance";
import { ApiRoutes } from "./constants";

interface ProductsResponse {
  products: Product[];
}

export const search = async (query: string): Promise<Product[]> => {
  return (
    await axiosInstance.get<ProductsResponse>(ApiRoutes.SEARCH_PRODUCTS, {
      params: { query },
    })
  ).data.products;
};
