import React from "react";
import { LuPlus, LuMinus } from "react-icons/lu";
import styles from "./ProductActions.module.scss";
import type { ProductActionsProps } from "./types";

export const ProductActions: React.FC<ProductActionsProps> = ({
  addToCart,
  removeFromCart,
  initialQuantity,
}) => {
  return (
    <div className={styles.actions}>
      {initialQuantity === 0 ? (
        <button
          className={styles.actions__button}
          type="button"
          onClick={addToCart}
          aria-label="Добавить товар в корзину"
        >
          <LuPlus className={styles.actions__buttonIcon} />
        </button>
      ) : (
        <div
          className={`${styles.actions__button} ${styles["actions__button--counter"]}`}
        >
          <button
            className={styles.actions__button}
            onClick={removeFromCart}
            aria-label="Уменьшить количество"
          >
            <LuMinus className={styles.actions__buttonIcon} />
          </button>
          <span className={styles.actions__counter}>{initialQuantity}</span>
          <button
            className={styles.actions__button}
            onClick={addToCart}
            aria-label="Увеличить количество"
          >
            <LuPlus className={styles.actions__buttonIcon} />
          </button>
        </div>
      )}
    </div>
  );
};
