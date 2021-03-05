import React from "react";
import styles from "../../styles/components/AppBar.module.css";
import { MdShoppingBasket } from "@react-icons/all-files/md/MdShoppingBasket";
export default function AppBar() {
  return (
    <>
      <header>
        <div className={styles.header}>
          <a href="#default">Logo</a>
          <div className={styles.headerCenter}>
            <a href="#home">Menu</a>
            <a href="#contact">Menu</a>
            <a href="#about">Menu</a>
            <a href="#menu">Menu</a>
            <a href="#menu">Menu</a>
          </div>
          <div className={styles.headerRight}>
            <a href="#menu">
              <MdShoppingBasket size={40} color="black" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
