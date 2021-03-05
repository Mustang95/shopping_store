import React from "react";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { BiCircle } from "@react-icons/all-files/bi/BiCircle";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import styles from "../../styles/components/Modal.module.css";
import { useProductsOnCart } from "../../context/ProductsContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Modal(props) {
  const [store, setStore] = useLocalStorage();
  const { productOnCart, setProductOnCart } = useProductsOnCart();
  function onClose(event) {
    props.onClose && props.onClose(event);
  }
  const removeProduct = (product) => {
    const newProductOnCart = [...productOnCart];
    newProductOnCart.splice(
      newProductOnCart.findIndex((elem) => elem.name === product.name),
      1
    );
    setProductOnCart(newProductOnCart);
    setStore(newProductOnCart);
  };
  return (
    <>
      {props.show ? (
        <div className={styles.modal} id="modal">
          <h2>
            <div className={styles.row}>
              <div className={styles.column3closeButton}>
                <IoMdClose onClick={onClose} />
              </div>
              <div className={styles.column3}>Carrinho</div>
              <div className={styles.column3}>
                <pre />
              </div>
            </div>
          </h2>
          <div className={styles.content}>
            <table>
              <thead>
                {store?.map((product, key) => (
                  <tr key={key}>
                    <td>
                      <BiCircle size={15} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.brand === null ? "-" : product.brand}</td>
                    <td>
                      <MdDeleteForever
                        size={25}
                        onClick={() => removeProduct(product, props)}
                      />
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </div>
      ) : null}
    </>
  );
}
