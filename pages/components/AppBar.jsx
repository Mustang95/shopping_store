import { useState } from "react";
import styles from "../../styles/components/AppBar.module.css";
import { MdShoppingBasket } from "@react-icons/all-files/md/MdShoppingBasket";
import Modal from "./Modal";

export default function AppBar() {
  const [show, setShow] = useState(false);
  const showModal = () => {
    const aux = !show;
    setShow(aux);
  };
  return (
    <>
      <header>
        <Modal onClose={showModal} show={show} />
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
            <a href="#">
              <MdShoppingBasket
                size={40}
                color="black"
                onClick={() => showModal()}
              />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
