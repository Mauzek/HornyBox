import React from "react";
import styles from "./ProductCard.module.scss";
import { LuPlus, LuMinus } from "react-icons/lu";
import { formatPrice } from "../../../utils";
import { PopupButton } from "../";
import type { ProductCardProps } from "./types";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isPopup = product.popupType !== "none";

  return (
    <article className={styles.card}>
      <div className={styles.card__imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.card__image}
        />
        {isPopup && <PopupButton type={product.popupType} />}
      </div>

      <div className={styles.card__content}>
        <div className={styles.card__info}>
          <div className={styles.card__titleWrapp}>
            <h3 className={styles.card__title}>{product.name}</h3>
            <p className={styles.card__category}>{product.category.name}</p>
          </div>

          <div
            className={`${styles.card__pricing} ${
              isPopup && styles["card__pricing--popup"]
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
