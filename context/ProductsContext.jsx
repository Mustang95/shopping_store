import React, { createContext, useContext, useReducer, useEffect } from "react";
import bookReducer from "../reducers/bookReducer";
const ProductsOnCartContext = createContext();

export default function ProductsOnCartProvider({ children }) {
  const [products, dispatch] = useReducer(bookReducer, [], () => {
    const localData = localStorage.getItem("products");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  return (
    <ProductsOnCartContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductsOnCartContext.Provider>
  );
}

export function useProductsOnCart() {
  const context = useContext(ProductsOnCartContext);
  if (!context)
    throw new Error(
      "useProductsOnCart must be used within a ProductsOnCartProvider"
    );

  const { products, dispatch } = context;
  return { products, dispatch };
}
