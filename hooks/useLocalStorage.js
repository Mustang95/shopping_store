import React, { useState, useEffect } from "react";

export default function useLocalStorage() {
  const key = "produtcs";
  const [store, setStore] = useState([]);
  function init() {
    const data = localStorage.getItem("products");
    if (data) {
      setStore(JSON.parse(data));
    }
  }
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    // localStorage.removeItem("products", JSON.stringify(store));
    localStorage.setItem("products", JSON.stringify(store));
  });
  return [store, setStore];
}
