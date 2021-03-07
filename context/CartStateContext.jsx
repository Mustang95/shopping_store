import React, { createContext, useState, useContext } from "react";

const CartStateContext = createContext();

export default function CartStateProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CartStateContext.Provider value={{ open, setOpen }}>
        {children}
      </CartStateContext.Provider>
    </>
  );
}

export function useCartState() {
  const context = useContext(CartStateContext);

  if (!context)
    throw new Error("useFlag must be used within a CartStateProvider");

  const { open, setOpen } = context;
  return { open, setOpen };
}
