import { useState } from "react";
import useTrintoApi from "../../hooks/useTrintoApi";
import styles from "../../styles/components/ListItems.module.css";
import { formatReal } from "../../helpers/helpers.js";

const elements = {
  currency: "",
  products: [],
};

export default function ListItems() {
  const { responseData, setResponseData } = useTrintoApi();
  const [filterValue, setFilterValue] = useState("");
  const [allValue, setAllValue] = useState(false);
  const [underFifity, setUnderFifity] = useState(false);
  const [overOneHundred, setOverOneHundred] = useState(false);
  elements.products = responseData?.products;
  elements.currency = responseData?.currency;

  return (
    <div className={styles.listItemsContainer}>
      <select
        name="select"
        onChange={(event) => {
          setFilterValue(event.target.value);
        }}
      >
        <option value=""> </option>
        <option value="">Exibir todos os produtos</option>
        <option value="hasStock">Exibir somente produtos com estoque</option>
      </select>
      <input
        type="checkbox"
        name="filterCheckbox"
        value={allValue}
        defaultChecked={allValue}
        onClick={(event) => {
          setAllValue(event.target.checked);
          setUnderFifity(false);
          setOverOneHundred(false);
        }}
      />
      <label htmlFor="allValues"> Todos os valores</label>
      <input
        type="checkbox"
        name="filterCheckbox"
        value={underFifity}
        defaultChecked={underFifity}
        onClick={(event) => {
          debugger;
          setAllValue(false);
          setUnderFifity(event.target.checked);
          setOverOneHundred(false);
        }}
      />
      <label htmlFor="untilFifty"> Até $50</label>
      <input
        type="checkbox"
        name="filterCheckbox"
        value={overOneHundred}
        defaultChecked={overOneHundred}
        onClick={(event) => {
          setAllValue(false);
          setUnderFifity(false);
          setOverOneHundred(event.target.checked);
        }}
      />
      <label htmlFor="plusOneHundrend"> A partir de $100</label>
      <table className={styles.tableProducts}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Em estoque</th>
            <th>Ações</th>
          </tr>
          {responseData?.products
            .filter((val) => {
              if (
                filterValue === "hasStock" &&
                underFifity === false &&
                overOneHundred === false
              ) {
                if (val.hasStock) return val;
              } else if (filterValue === "hasStock" && underFifity === true) {
                if (val.price <= 50 && val.hasStock) return val;
              } else if (
                filterValue === "hasStock" &&
                overOneHundred === false &&
                underFifity === false
              ) {
                if (val.hasStock) return val;
              } else if (
                filterValue === "hasStock" &&
                overOneHundred === true
              ) {
                if (val.hasStock && val.price >= 100) return val;
              } else if (filterValue === "" && underFifity === true) {
                if (val.price <= 50) return val;
              } else if (filterValue === "" && overOneHundred === true) {
                if (val.price >= 100) return val;
              } else {
                return val;
              }
            })
            .map((item, key) => (
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.brand === null ? "-" : item.brand}</td>
                <td>{`${responseData.currency} ${formatReal(item.price)}`}</td>
                <td>{item.hasStock === true ? "Sim" : "Não"}</td>
                <td>
                  <button className={styles.buyButton}>COMPRAR</button>
                </td>
              </tr>
            ))}
        </thead>
      </table>
    </div>
  );
}
