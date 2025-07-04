import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { LuTrash } from "react-icons/lu";
import styles from "./ProductCart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearProductCart, type RootState } from "../../../store";
import type { ProductCartProps } from "./types";
import { ProductCartItem } from "../ProductCartItem";
import CountUp from 'react-countup';
import { PaywallForm } from "../../Popups";

export const ProductCart: React.FC<ProductCartProps> = ({ productName, payment }) => {
  const dispatch = useDispatch();

  const gameCart = useSelector((state: RootState) => state.cart[productName]);

  const cartData = useMemo(() => {
    const price = gameCart ? gameCart.metadata.totalPrice : 0;
    const quantity = gameCart ? gameCart.metadata.totalQuantity : 0;
    const items = gameCart ? gameCart.items : [];
    const isEmpty = quantity === 0;
    let productsQuantity = null;
    if (quantity === 1) {
      productsQuantity = "1 товар";
    } else if (quantity > 1 && quantity < 5) {
      productsQuantity = `${quantity} товара`;
    } else {
      productsQuantity = `${quantity} товаров`;
    }
    
    return { price, quantity, items, isEmpty, productsQuantity };
  }, [gameCart]);
  
  const prevPriceRef = useRef<number>(cartData.price);
  useEffect(() => {
    prevPriceRef.current = cartData.price;
  }, [cartData.price]);

  const handleClearCart = useCallback(() => {
    dispatch(clearProductCart(productName));
  }, [dispatch, productName]);

  const reverseItems = useMemo(() => {
    return cartData.items.slice().reverse();
  }, [cartData.items]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__header}>
        <div className={styles.cart__header_content}>
          <p className={styles.cart__title}>
            Корзина
            <span className={styles.cart__total_price}>
              {" "}
              <CountUp
                start={prevPriceRef.current}
                end={cartData.price}
                duration={0.6}
                separator=" "
              /> ₽
            </span>
          </p>
          <button
            className={styles["cart__button--clear"]}
            onClick={handleClearCart}
          >
            <LuTrash />
          </button>
        </div>
        {cartData.isEmpty ? (
          <div className={styles.cart__empty}>
            <p className={styles.cart__empty_text}>Пополни корзину :(</p>
          </div>
        ) : (
          <p className={styles.cart__total_quantity}>
            {cartData.productsQuantity}
          </p>
        )}
      </div>

      <div className={styles.cart__items}>
        {reverseItems.map((item) => (
          <ProductCartItem
            key={item.id}
            product={item}
            productName={productName}
          />
        ))}
      </div>

      <button
        className={`${styles.cart__button} ${
          cartData.isEmpty && styles["cart__button--empty"]
        }`}
      >
        Перейти к оплате
      </button>

      <PaywallForm payment={payment} totalPrice={cartData.price} cartItems={cartData.items} productName={productName} />
    </div>
  );
};