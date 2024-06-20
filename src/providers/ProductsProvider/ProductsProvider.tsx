import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { getAllProducts } from "src/services/product/product";
import { Product } from "src/services/product/types";

interface ProductsContextType {
  products: Product[];
  setProducts: (data: Product[]) => void;
}

const ProductContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => [],
});

export const ProductsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const updateData = useCallback(async () => {
    const data = await getAllProducts().catch(() => []);

    setProducts(data);
  }, [setProducts]);

  useEffect(() => {
    void updateData();
  }, [updateData]);

  return <ProductContext.Provider value={{ products, setProducts }}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext<ProductsContextType>(ProductContext);

  if (!context) {
    throw new Error("Context error: Use Products Context within ProductsPage provider");
  }

  return context;
};
