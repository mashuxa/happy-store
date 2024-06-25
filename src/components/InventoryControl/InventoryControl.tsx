import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useCallback, useState } from "react";
import { useProducts } from "src/providers/ProductsProvider/ProductsProvider";
import { InventoryItem } from "src/services/inventory/types";
import { updateInventoryData } from "src/utils/updateInventoryData/updateInventoryData";
import { Button } from "../Button/Button";
import styles from "./InventoryControl.module.scss";

interface InventoryControlProps {
  updateInventory: Dispatch<SetStateAction<InventoryItem[]>>;
  onFocus: () => void;
}

const InventoryControl: FC<InventoryControlProps> = ({ updateInventory, onFocus }) => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleChangeSelect = useCallback(({ target }: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(target.value);
  }, []);
  const handleChangeNumber = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(target.value));
  }, []);
  const handleSubmit = useCallback(
    ({ preventDefault }: FormEvent<HTMLFormElement>) => {
      preventDefault();

      if (selectedProduct) {
        updateInventory((prevState) => updateInventoryData(prevState, selectedProduct, quantity));
      }
    },
    [quantity, selectedProduct, updateInventory],
  );

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit} onFocus={onFocus}>
      <div className={styles.fieldset}>
        <select className={styles.select} value={selectedProduct} onChange={handleChangeSelect}>
          <option value="" disabled>
            Select product
          </option>
          {products.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <input className={styles.count} type="number" min={1} value={quantity} onChange={handleChangeNumber} />
      </div>
      <Button disabled={!selectedProduct}>Add</Button>
    </form>
  );
};

export default InventoryControl;
