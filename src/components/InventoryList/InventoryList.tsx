import { Dispatch, FC, SetStateAction, useCallback } from "react";
import InventoryListItem from "src/components/InventoryListItem/InventoryListItem";
import { InventoryItem } from "src/services/inventory/types";
import styles from "./InventoryList.module.scss";

interface InventoryListProps {
  data: InventoryItem[];
  updateInventory: Dispatch<SetStateAction<InventoryItem[]>>;
}
const InventoryList: FC<InventoryListProps> = ({ data, updateInventory }) => {
  const handleRemoveItem = useCallback(
    (removedItem: string): void => {
      updateInventory((prevState) => {
        return prevState.filter(({ name }) => name !== removedItem);
      });
    },
    [updateInventory],
  );

  return (
    <ul className={styles.wrapper}>
      {data.map((item) => (
        <InventoryListItem key={item.name} data={item} onRemove={handleRemoveItem} />
      ))}
    </ul>
  );
};

export default InventoryList;
