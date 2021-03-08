import { useCartState } from "../../context/CartStateContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { BiCircle } from "@react-icons/all-files/bi/BiCircle";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import styles from "../../styles/components/Modal.module.css";
import { useProductsOnCart } from "../../context/ProductsContext";

export default function Modal(props) {
  const { open, setOpen } = useCartState();
  const { products, dispatch } = useProductsOnCart();
  const { productOnCart, setProductOnCart } = useProductsOnCart();
  function onClose(event) {
    props.onClose && props.onClose(event);
  }
  function totalPriceOnCart() {
    let totalprice = 0;
    for (let value of products) {
      totalprice += value.price;
    }
    return totalprice;
  }
  let currentValue = totalPriceOnCart();
  return (
    <>
      {open ? (
        <div className={styles.modal} id="modal">
          <h2>
            <div className={styles.row}>
              <div className={styles.column3closeButton}>
                <IoMdClose onClick={onClose} />
              </div>
              <div className={styles.column3}>Carrinho</div>
              <div className={styles.column3}>
                {currentValue}
                <pre />
              </div>
            </div>
          </h2>
          <div className={styles.content}>
            <table>
              <thead>
                {products?.map((product, key) => (
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
                        onClick={() =>
                          dispatch({ type: "REMOVE_PRODUCT", product })
                        }
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
