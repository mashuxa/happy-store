import { FC, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "src/components/Button/Button";
import InventoryControl from "src/components/InventoryControl/InventoryControl";
import InventoryList from "src/components/InventoryList/InventoryList";
import { ROUTES } from "src/router/routes";
import { getAllInventoryItems, resetInventory, updateInventory } from "src/services/inventory/inventory";
import { InventoryItem } from "src/services/inventory/types";
import styles from "./InventoryPage.module.scss";

const InventoryPage: FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [error, setError] = useState("");
  const getInventoryData = useCallback(async () => {
    try {
      const data = await getAllInventoryItems();

      setInventory(data);
    } catch (e) {
      // handle error
    }
  }, []);
  const [isUpdating, setIsUpdating] = useState(false);

  const resetError = useCallback(() => setError(""), []);
  const handleSave = useCallback(async () => {
    setIsUpdating(true);

    try {
      const data = await updateInventory(inventory);

      setInventory(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsUpdating(false);
    }
  }, [inventory]);
  const handleReset = useCallback(async () => {
    setIsUpdating(true);

    try {
      const data = await resetInventory();

      setInventory(data);
    } finally {
      setIsUpdating(false);
    }
  }, []);

  useEffect(() => {
    void getInventoryData();
  }, [getInventoryData]);

  return (
    <div>
      <div className={styles.wrapper}>
        <InventoryControl updateInventory={setInventory} onFocus={resetError} />
        <NavLink className={styles.link} to={ROUTES.addProduct}>
          + New product
        </NavLink>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <InventoryList data={inventory} updateInventory={setInventory} />
      <div className={styles["btn-wrapper"]}>
        <Button isLoading={isUpdating} onClick={handleReset} className={styles.button}>
          Reset
        </Button>
        <Button isLoading={isUpdating} onClick={handleSave} className={styles.button}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default InventoryPage;
