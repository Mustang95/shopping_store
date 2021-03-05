import React, { createContext, useContext, useState } from "react";

const ProductsOnCartContext = createContext();

export default function ProductsOnCartProvider({ children }) {
  const [productOnCart, setProductOnCart] = useState([]);
  return (
    <ProductsOnCartContext.Provider value={{ productOnCart, setProductOnCart }}>
      {children}
    </ProductsOnCartContext.Provider>
  );
}

export function useProductsOnCart() {
  const context = useContext(ProductsOnCartContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductsOnCartProvider");

  const { productOnCart, setProductOnCart } = context;
  return { productOnCart, setProductOnCart };
}
