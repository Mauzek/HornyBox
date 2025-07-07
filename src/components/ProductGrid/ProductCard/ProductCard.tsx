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
import { usePopup } from "../../../hooks";
import { ProductCardInfo } from "../../Popups";

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, productName }) => {
    const isPopup = product.popupType !== "none";
    const dispatch = useDispatch();
    const { isVisible, toggle, hide } = usePopup();
    const quantity = useSelector((state: RootState) => {
      if (!productName) return 0;
      const gameCart = state.cart[productName];
      const cartItem = gameCart?.items.find((item) => item.id === product.id);
      return cartItem?.quantity || 0;
    },(left, right) => left === right);

    const handleToggle = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    }, [toggle]);

    const handleAddToCart = useCallback(() => {
      if (!productName) return;
      dispatch(
        addItemToCart({
          productName,
          item: { ...product, quantity: 1 },
        })
      );
    }, [productName, dispatch, product]);

    const handleRemoveFromCart = useCallback(() => {
      if (!productName) return;
      dispatch(
        removeItemFromCart({
          productName,
          itemId: product.id,
          quantity: 1,
        })
      );
    }, [productName, dispatch, product]);

    return (
      <article className={styles.card}>
        <div className={styles.card__imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.card__image}
          />
          {isPopup && (
            <PopupButton type={product.popupType} onClick={handleToggle} />
          )}
        </div>
        <div className={styles.card__content}>
          <div className={styles.card__info}>
            <div className={styles.card__titleWrapp}>
              <h3 className={`${styles.card__title} ${ product.category.name && styles['card__title--line-clamp']}`}>{product.name}</h3>
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
            addToCart={product.popupType === "bot" ? handleToggle : handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </div>
        {product.popupData && (
          <ProductCardInfo
            isOpen={isVisible}
            content={product.popupData}
            onClose={hide}
            type={product.popupType}
          />
        )}
      </article>
    );
  }
);
