import React from "react";
import { LuTrash } from "react-icons/lu";
import styles from "./ProductCart.module.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { ProductCartProps } from "./types";

export const ProductCart: React.FC<ProductCartProps> = ({ gameName }) => {
  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart.genshin_impact.metadata.totalPrice);
  const price = cart[gameName] ? cart[gameName].metadata.totalPrice : 0;
  const quantity = cart[gameName] ? cart[gameName].metadata.totalQuantity: 0;
  return (
    <div className={styles.cart}>
      <div className={styles.cart__header}>
        <p className={styles.cart__title}>
          Корзина
          <span className={styles.cart__total_price}> {price} ₽</span>
        </p>
        <button className={styles["cart__button--clear"]}>
          <LuTrash />
        </button>
      </div>
      {quantity > 0 ? (
        <p className={styles.cart__total_quantity}>{quantity} товар</p>
      ) : (
        <div className={styles.cart__empty}>
          <p className={styles.cart__empty_text}>Пополни корзину :(</p>
        </div>
      )}
      <div className={styles.cart__body}></div>
      <div className={styles.cart__footer}>
        <button className={styles.cart__button}>Перейти к оплате</button>
      </div>
    </div>
  );
};
