import { FC } from "react";
import AddProductForm from "src/components/AddProductForm/AddProductForm";

const AddProductPage: FC = () => {
  return (
    <div>
      <h1>New Product:</h1>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
