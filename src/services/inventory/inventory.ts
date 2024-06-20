import { fetcher } from "../api";
import { InventoryItem } from "./types";

export const getAllInventoryItems = async (): Promise<InventoryItem[]> => {
  return await fetcher<InventoryItem[]>("inventory");
};

export const updateInventory = async (data: InventoryItem[]): Promise<InventoryItem[]> => {
  return await fetcher("inventory", { method: "POST", body: JSON.stringify(data) });
};

export const resetInventory = async (): Promise<[]> => {
  return await fetcher("inventory/reset", { method: "POST" });
};
