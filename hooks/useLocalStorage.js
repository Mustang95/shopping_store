import React, { useState, useEffect } from "react";

export default function useLocalStorage() {
  const key = "produtcs";
  const [store, setStore] = useState([
    {
      name: "",
      brand: null,
      price: 0,
      hasStock: true,
    },
  ]);
  useEffect(() => {
    const data = localStorage.getItem("products");
    if (data) {
      setStore(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(store));
  });
  return [store, setStore];
}
