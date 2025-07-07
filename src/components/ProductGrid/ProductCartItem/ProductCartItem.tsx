import React, { memo, useCallback } from "react";
import styles from "./ProductCartItem.module.scss";
import { LuPlus, LuMinus } from "react-icons/lu";
import type { ProductCartItemProps } from "./types";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../../store";

export const ProductCartItem: React.FC<ProductCartItemProps> = memo(
  ({ productName, product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = useCallback(() => {
      dispatch(
        addItemToCart({
          productName,
          item: { ...product, quantity: 1 },
        })
      );
    }, [dispatch, productName, product]);

    const handleRemoveFromCart = useCallback(() => {
      dispatch(
        removeItemFromCart({
          productName,
          itemId: product.id,
          quantity: 1,
        })
      );
    }, [dispatch, productName, product.id]);

    return (
      <div className={styles.cartItem}>
        <div className={styles.cartItem__content}>
          <picture className={styles.cartItem__image_container}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.cartItem__image}
              loading="lazy"
            />
          </picture>
          <div className={styles.cartItem__info}>
            <p className={styles.cartItem__name}>{product.name}</p>
            <p className={styles.cartItem__quantity}>
              {product.category.name} x{product.quantity}
            </p>
            <p className={styles.cartItem__price}>{product.price} ₽</p>
          </div>
        </div>
        <div className={styles.cartItem__actions}>
          <button
            className={styles.cartItem__button}
            onClick={handleRemoveFromCart}
          >
            <LuMinus className={styles.cartItem__buttonIcon} />
          </button>
          <p className={styles.cartItem__total_quantity}>{product.quantity}</p>
          <button className={styles.cartItem__button} onClick={handleAddToCart}>
            <LuPlus className={styles.cartItem__buttonIcon} />
          </button>
        </div>
      </div>
    );
  }
);
