import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useClickOutside, useEscapeKey } from "../../../hooks";
import { IoMdClose } from "react-icons/io";
import styles from "./PaywallForm.module.scss";
import { ProductCartItem } from "../../ProductGrid/ProductCartItem";
import type { PaywallFormProps } from "./types";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

export const PaywallForm: React.FC<PaywallFormProps> = ({
  payments,
  productName,
  onClose,
  isOpen,
  cartItems,
  totalPrice,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<number>(1);
  const [uid, setUid] = useState<string>("");
  const popupRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useClickOutside(popupRef, onClose, isOpen);
  useEscapeKey(onClose, isOpen);

  const prevPriceRef = useRef<number>(totalPrice);

  useEffect(() => {
    prevPriceRef.current = totalPrice;
  }, [totalPrice]);

  useEffect(() => {
    if (cartItems.length === 0) {
      onClose();
    }
  }, [cartItems, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = "hidden";
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(showTimer);
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      const hideTimer = setTimeout(() => {
        setIsMounted(false);
      }, 150);
      return () => clearTimeout(hideTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isMounted) return null;

  const popupContent = (
    <div
      className={`${styles.overlay} ${
        isVisible ? styles["overlay--visible"] : styles["overlay--hidden"]
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={popupRef}
        className={`${styles.popup} ${
          isVisible ? styles["popup--visible"] : styles["popup--hidden"]
        }`}
        onClick={handleContentClick}
      >
        <button
          className={styles.popup__close}
          aria-label="Закрыть"
          onClick={onClose}
        >
          <IoMdClose className={styles.popup__close_icon} />
        </button>

        <div className={styles.popup__content}>
          <div className={styles.popup__form}>
            <h4
              className={styles.popup__title}
              style={
                payments.type !== "uid" ? { marginBottom: "2px" } : undefined
              }
            >
              Оформление
            </h4>

            <div className={styles.popup__scroll}>
              <div className={styles.popup__fields}>
                {payments.type === "uid" && (
                  <div className={styles.popup__field}>
                    <label htmlFor="uid" className={styles.popup__label}>
                      UID для вставки
                    </label>
                    <div
                      className={styles.popup__input}
                      tabIndex={0}
                      onClick={() => {
                        const input = document.getElementById("uid");
                        if (input) input.focus();
                      }}
                    >
                      <input
                        id="uid"
                        type="text"
                        value={uid}
                        placeholder="Введите UID"
                        onChange={(e) => setUid(e.target.value)}
                        className={styles.popup__input_field}
                        inputMode="numeric"
                        autoFocus
                        pattern="(?:[6-9]\d{8}|18\d{7,8})"
                      />
                      <div className={styles.popup__input_actions}>
                        <button className={styles.popup__help_button}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            fill="none"
                          >
                            <path
                              fill="#fff"
                              d="M10.72 13.996v-2.544q1.296-.064 1.984-.544.705-.495.704-1.456v-.224q0-.736-.448-1.136-.448-.416-1.2-.416-.8 0-1.28.464-.48.465-.656 1.184l-1.52-.608q.144-.495.416-.96.288-.464.72-.816.433-.368 1.024-.576.592-.225 1.36-.224.784 0 1.424.224.64.225 1.088.64.448.4.688.992.24.575.24 1.28 0 .72-.256 1.296a2.9 2.9 0 0 1-.656.96q-.4.4-.912.656-.511.24-1.056.336v1.472zm.848 3.696q-.608 0-.896-.288-.272-.305-.272-.768v-.272q0-.465.272-.752.287-.304.896-.304.608 0 .88.304.288.288.288.752v.272q0 .464-.288.768-.272.288-.88.288"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.popup__payment_methods}>
                  <div className={styles.popup__payment_grid}>
                    {payments.methods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        className={`${styles.popup__payment_method} ${
                          selectedPayment === method.id
                            ? styles["popup__payment_method--active"]
                            : ""
                        }`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className={styles.popup__payment_content}>
                          <img
                            src={method.icon}
                            alt={method.name}
                            className={styles.popup__payment_icon}
                          />
                          <p className={styles.popup__payment_text}>
                            {method.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.popup__support}>
              <div className={styles.popup__support_icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="34"
                  fill="none"
                  viewBox="0 0 39 34"
                >
                  <g clipPath="url(#heart-icon_svg__a)">
                    <path
                      fill="#C8FF00"
                      fillRule="evenodd"
                      d="M19.185 6.005c2.477-2.565 4.212-4.783 8.028-5.217 7.165-.817 13.755 6.47 10.137 13.645-1.03 2.043-3.127 4.473-5.446 6.857-2.545 2.618-5.362 5.183-7.335 7.128l-5.381 5.303-4.447-4.252C9.39 24.35.667 17.908.38 9.926.179 4.334 4.62.752 9.728.816c4.565.062 6.485 2.317 9.457 5.19"
                      clipRule="evenodd"
                    />
                  </g>
                </svg>
              </div>
              <div className={styles.popup__support_text}>
                <p>Ты можешь поддержать любимчика</p>
                <Link to="/about">В разделе "О нас"</Link>
              </div>
              <button className={styles.popup__tooltip_button}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  fill="none"
                >
                  <path
                    fill="#fff"
                    d="M9 11.996v-2.544q1.296-.064 1.984-.544.705-.495.704-1.456v-.224q0-.736-.448-1.136-.448-.416-1.2-.416-.8 0-1.28.464-.48.465-.656 1.184l-1.52-.608q.144-.495.416-.96.288-.464.72-.816.433-.368 1.024-.576.592-.225 1.36-.224.784 0 1.424.224.64.225 1.088.64.448.4.688.992.24.575.24 1.28 0 .72-.256 1.296a2.9 2.9 0 0 1-.656.96q-.4.4-.912.656-.511.24-1.056.336v1.472zm.848 3.696q-.608 0-.896-.288-.272-.305-.272-.768v-.272q0-.465.272-.752.287-.304.896-.304.608 0 .88.304.288.288.288.752v.272q0 .464-.288.768-.272.288-.88.288"
                  />
                </svg>
              </button>
              <div className={styles.popup__tooltip}>
                <p>
                  Чтобы сменить любимчика - найди реферальную ссылку на его
                  канале и перейди по ней, или же выбери кого-то в разделе "О
                  нас (Любимчики)"💚
                </p>
              </div>
            </div>
          </div>

          <div className={styles.popup__separator}></div>

          <div className={styles.popup__cart}>
            <div className={styles.popup__cart_header}>
              <h4 className={styles.popup__cart_title}>
                Товары{" "}
                <span>
                  <CountUp
                    start={prevPriceRef.current}
                    end={totalPrice}
                    duration={0.6}
                    separator=" "
                  />{" "}
                  ₽
                </span>
              </h4>
              <p className={styles.popup__cart_count}>
                {cartItems.length} товар{cartItems.length > 1 ? "а" : ""}
              </p>
            </div>

            <div className={styles.popup__cart_content}>
              <div className={styles.popup__cart_items}>
                {cartItems.map((item) => (
                  <ProductCartItem
                    key={item.id}
                    product={item}
                    productName={productName}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          className={styles.popup__continue_button}
          data-testid="create-order-button"
          disabled={payments.type === "uid" && !uid.trim()}
        >
          Продолжить
        </button>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
};
