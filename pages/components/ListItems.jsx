import React from "react";
import useTrintoApi from "../../hooks/useTrintoApi";
import { RiMoneyDollarCircleFill } from "@react-icons/all-files/ri/RiMoneyDollarCircleFill";
import styles from "../../styles/components/ListItems.module.css";
import { formatReal } from "../../helpers/helpers.js";

export default function ListItems() {
  const { responseData } = useTrintoApi();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Em estoque</th>
            <th>Ações</th>
          </tr>
          {responseData?.products.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.brand === null ? "-" : item.brand}</td>
              <td>{`${responseData.currency} ${formatReal(item.price)}`}</td>
              <td>{item.hasStock === true ? "Sim" : "Não"}</td>
              <td>
                <div className={styles.buttonContainer}>
                  <button className={styles.buyButton}>COMPRAR</button>
                </div>
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}
