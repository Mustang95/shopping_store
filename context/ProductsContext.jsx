import React, { createContext, useContext, useState } from "react";

const ProductsDataContext = createContext({});

export default function ProductsDataProvider(children) {
  const [productSelect, setProductSelect] = useState([]);
  return (
    <ProductsDataContext.Provider value={{ productSelect, setProductSelect }}>
      {children}
    </ProductsDataContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsDataContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductsDataProvider");

  const { productSelect, setProductSelect } = context;
  return { productSelect, setProductSelect };
}
