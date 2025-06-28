import React, { useCallback } from "react";
import styles from "./ProductCard.module.scss";
import { formatPrice } from "../../../utils";
import { PopupButton, ProductActions } from "../";
import type { ProductCardProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  type RootState,
} from "../../../store";

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, gameName }) => {
    const isPopup = product.popupType !== "none";
    const dispatch = useDispatch();

    const quantity = useSelector((state: RootState) => {
      if (!gameName) return 0;
      const gameCart = state.cart[gameName];
      const cartItem = gameCart?.items.find((item) => item.id === product.id);
      return cartItem?.quantity || 0;
    });

    const handleAddToCart = useCallback(() => {
      if (!gameName) return;
      dispatch(
        addItemToCart({
          gameName,
          item: { ...product, quantity: 1 },
        })
      );
    }, [gameName, dispatch, product]);

    const handleRemoveFromCart = useCallback(() => {
      if (!gameName) return;
      dispatch(
        removeItemFromCart({
          gameName,
          itemId: product.id,
          quantity: 1,
        })
      );
    }, [gameName, dispatch, product]);

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
          <ProductActions
            initialQuantity={quantity}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </div>
      </article>
    );
  }
);
