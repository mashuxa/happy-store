import { FC, useCallback } from "react";
import { InventoryItem } from "src/services/inventory/types";
import { Button } from "../Button/Button";
import styles from "./InventoryListItem.module.scss";

interface InventoryListItemProps {
  data: InventoryItem;
  onRemove: (name: string) => void;
}
const InventoryListItem: FC<InventoryListItemProps> = ({ data, onRemove }) => {
  const handleClick = useCallback(() => onRemove(data.name), [data.name, onRemove]);

  return (
    <li className={styles.wrapper}>
      <span className={styles.left}>{data.name}</span>
      <span className={styles.center}>{data.quantity}</span>
      <span className={styles.right}>
        <Button onClick={handleClick}>Remove</Button>
      </span>
    </li>
  );
};

export default InventoryListItem;
