import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { LuTrash } from "react-icons/lu";
import styles from "./ProductCart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearProductCart, type RootState } from "../../../store";
import type { ProductCartProps } from "./types";
import { ProductCartItem } from "../ProductCartItem";
import CountUp from "react-countup";
import { PaywallForm } from "../../Popups";
import { usePopup } from "../../../hooks";

export const ProductCart: React.FC<ProductCartProps> = ({
  productName,
  payments,
}) => {
  const dispatch = useDispatch();
  const { isVisible, toggle, hide } = usePopup();
  const productCart = useSelector((state: RootState) => state.cart[productName]);

  const cartData = useMemo(() => {
    const price = productCart ? productCart.metadata.totalPrice : 0;
    const quantity = productCart ? productCart.metadata.totalQuantity : 0;
    const items = productCart ? productCart.items : [];
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
  }, [productCart]);

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
              />{" "}
              ₽
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
        onClick={toggle}
      >
        Перейти к оплате
      </button>

      <PaywallForm
        payments={payments}
        totalPrice={cartData.price}
        totalQuantity={cartData.quantity}
        cartItems={cartData.items}
        productName={productName}
        isOpen={isVisible}
        onClose={hide}
      />
    </div>
  );
};
