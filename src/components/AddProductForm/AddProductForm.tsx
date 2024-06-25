import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { useProducts } from "src/providers/ProductsProvider/ProductsProvider";
import { createNewProduct } from "src/services/product/product";
import { Button } from "../Button/Button";
import styles from "./AddProductForm.module.scss";

const AddProductForm: FC = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { setProducts } = useProducts();

  const handleChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  }, []);
  const handleSubmit = useCallback(
    async ({ preventDefault }: FormEvent<HTMLFormElement>) => {
      preventDefault();
      setIsUpdating(true);

      try {
        const data = await createNewProduct({ name: value });

        setProducts(data);
        setValue("");
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsUpdating(false);
      }
    },
    [setProducts, value],
  );
  const resetError = useCallback(() => setError(""), []);

  return (
    <form name="product" className={styles.wrapper} onSubmit={handleSubmit}>
      <label htmlFor="name">Product name:</label>
      <input
        className={styles.input}
        id="name"
        type="text"
        value={value}
        placeholder="type here.."
        onChange={handleChange}
        onFocus={resetError}
      />
      {error && <div className={styles.error}>{error}</div>}
      <Button isLoading={isUpdating}>Save</Button>
    </form>
  );
};

export default AddProductForm;
