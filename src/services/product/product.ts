import { fetcher } from "../api";
import { Product } from "./types";

export const getAllProducts = async (): Promise<Product[]> => {
  return await fetcher("product/all");
};

export const createNewProduct = async (data: Product): Promise<Product[]> => {
  return await fetcher("product", { method: "PUT", body: JSON.stringify(data) });
};
