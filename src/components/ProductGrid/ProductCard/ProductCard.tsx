import React from "react";
import styles from "./ProductCard.module.scss";
import { LuPlus, LuMinus, LuTriangleAlert } from "react-icons/lu";
import { icons } from "../../../assets/icons";
import { formatPrice } from "../../../utils";
import type { ProductCardProps } from "./types";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  let popupButton = null;

  switch (product.popupType) {
    case "bot":
      popupButton = (
        <button
          className={`${styles.card__popupButton} ${styles["card__popupButton--bot"]}`}
          type="button"
          aria-label="Открыть информацию о товаре"
        >
          <img
            src={icons.bot_popup}
            alt="Bot popup"
            className={`${styles.card__popupIcon} ${styles["card__popupIcon--bot"]}`}
          />
        </button>
      );
      break;
    case "explanation":
      popupButton = (
        <button
          className={`${styles.card__popupButton} ${styles["card__popupButton--explanation"]}`}
          type="button"
          aria-label="Открыть информацию о товаре"
        >
          <img
            src={icons.question_popup}
            alt="Explanation popup"
            className={`${styles.card__popupIcon} ${styles["card__popupIcon--explanation"]}`}
          />
        </button>
      );
      break;
    case "fullpack":
      popupButton = (
        <button
          className={`${styles.card__popupButton} ${styles["card__popupButton--fullpack"]}`}
          type="button"
          aria-label="Открыть информацию о товаре"
        >
          <LuTriangleAlert
            className={`${styles.card__popupIcon} ${styles["card__popupIcon--fullpack"]}`}
          />
        </button>
      );
      break;
    default:
      break;
  }

  return (
    <article className={styles.card}>
      <div className={styles.card__imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.card__image}
        />
        {popupButton && popupButton}
      </div>

      <div className={styles.card__content}>
        <div className={styles.card__info}>
          <div className={styles.card__titleWrapp}>
            <h3 className={styles.card__title}>{product.name}</h3>
            <p className={styles.card__category}>{product.category.name}</p>
          </div>

          <div
            className={`${styles.card__pricing} ${
              popupButton && styles["card__pricing--popup"]
            }`}
          >
            <p className={styles.card__price}>
              {formatPrice(product.price)}&nbsp;₽
            </p>
            {product.discountPrice > 0 && (
              <p className={styles.card__discountPrice}>
                {product.discountPrice}
              </p>
            )}
          </div>
        </div>

        <div className={styles.card__actions}>
          <button
            className={styles.card__button}
            type="button"
            aria-label="Добавить товар в корзину"       
          >
            <LuPlus className={styles.card__buttonIcon} />
          </button>

          <div
            className={`${styles.card__button} ${styles.card__button__counter}`}
            aria-label="Изменить количество товара"
           style={{ display: "none" }}
          >
            <button className={styles.card__button}>
              <LuMinus className={styles.card__buttonIcon} />
            </button>
            <span className={styles.card__counter}>1</span>
            <button className={styles.card__button}>
              <LuPlus className={styles.card__buttonIcon} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
