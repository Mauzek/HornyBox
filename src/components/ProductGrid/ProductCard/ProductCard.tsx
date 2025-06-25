import React from "react";
import styles from "./ProductCard.module.scss";
import { LuPlus, LuMinus, LuTriangleAlert } from "react-icons/lu";
import { icons } from "../../../assets/icons";
import type { ProductCardProps } from "./types";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  let popupIcon = null;

  switch (product.popupType) {
    case "bot":
      popupIcon = (
        <img
          src={icons.bot_popup}
          alt="Bot popup"
          className={styles.card__popupIcon}
        />
      );
      break;
    case "explanation":
      popupIcon = (
        <img
          src={icons.question_popup}
          alt="Explanation popup"
          className={styles.card__popupIcon}
        />
      );
      break;
    case "fullpack":
      popupIcon = <LuTriangleAlert className={styles.card__popupIcon} />;
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
        {popupIcon && (
          <button
            className={styles.card__popupButton}
            type="button"
            aria-label="Открыть информацию о товаре"
          >
            {popupIcon}
          </button>
        )}
      </div>

      <div className={styles.card__content}>
        <div className={styles.card__info}>
          <div className={styles.card__titleWrapp}>
            <h3 className={styles.card__title}>{product.name}</h3>
            <p className={styles.card__category}>{product.category.name}</p>
          </div>

          <div className={styles.card__pricing}>
            <p className={styles.card__price}>{product.price}&nbsp;₽</p>
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

          <button
            className={`${styles.card__button} ${styles.card__button_type_counter}`}
            type="button"
            aria-label="Изменить количество товара"
            style={{ display: "none" }}
          >
            <LuMinus className={styles.card__buttonIcon} />
            <span className={styles.card__counter}>0</span>
            <LuPlus className={styles.card__buttonIcon} />
          </button>
        </div>
      </div>
    </article>
  );
};
