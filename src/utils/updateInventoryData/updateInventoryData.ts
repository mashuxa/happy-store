import { InventoryItem } from "src/services/inventory/types";

interface Accumulator {
  prevQuantity: number;
  restData: InventoryItem[];
}

export const updateInventoryData = (prevData: InventoryItem[], name: string, count: number): InventoryItem[] => {
  const InventoryAccumulatorDefault: Accumulator = {
    prevQuantity: 0,
    restData: [],
  };
  const sortedData = prevData.reduce((acc, currentValue) => {
    if (currentValue.name === name) {
      acc.prevQuantity = currentValue.quantity;
    } else {
      acc.restData.push(currentValue);
    }

    return acc;
  }, InventoryAccumulatorDefault);
  const updatedInventoryItem = { name, quantity: sortedData.prevQuantity + count };

  return [updatedInventoryItem, ...sortedData.restData];
};
