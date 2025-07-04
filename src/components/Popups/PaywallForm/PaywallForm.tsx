import React, { useState } from "react";
import styles from "./PaywallForm.module.scss";
import { ProductCartItem } from "../../ProductGrid/ProductCartItem";
import { IoMdClose } from "react-icons/io";
import type { PaywallFormProps } from "./types";
interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  testId: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "21",
    name: "СБП",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/%D1%81%D0%B1%D0%BF.svg",
    testId: "payment-21",
  },
  {
    id: "26",
    name: "СБП #2",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/%D1%81%D0%B1%D0%BF.svg",
    testId: "payment-26",
  },
  {
    id: "25",
    name: "Карта",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/1.svg",
    testId: "payment-25",
  },
  {
    id: "1",
    name: "Карта #2",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/1.svg",
    testId: "payment-1",
  },
  {
    id: "19",
    name: "Карта не РФ",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/cardOverpay.svg",
    testId: "payment-19",
  },
  {
    id: "27",
    name: "Карта не РФ #2",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/cardOverpay.svg",
    testId: "payment-27",
  },
  {
    id: "5",
    name: "Crypto",
    icon: "https://storage.yandexcloud.net/hornybox/PaymentSystem/crupto_usdt.svg",
    testId: "payment-5",
  },
];

export const PaywallForm: React.FC<PaywallFormProps> = ({
  payment,
  productName,
  onClose,
  cartItems,
  totalPrice,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string>("21");
  const [uid, setUid] = useState<string>("");

  return (
    <div className={styles.paywall}>
      <div className={styles.paywall__overlay} />

      <div role="dialog" className={styles.paywall__dialog} data-state="open">
        <button
          type="button"
          className={styles.paywall__close}
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        <div className={styles.paywall__content}>
          {/* Left Panel - Payment Form */}
          <div className={styles.paywall__form}>
            <h4 className={styles.paywall__title}>Оформление</h4>

            <div className={styles.paywall__scroll}>
              <div className={styles.paywall__fields}>
                {/* UID Input */}
                <div className={styles.paywall__field}>
                  <label htmlFor="uid" className={styles.paywall__label}>
                    UID для вставки
                  </label>
                  <div className={styles.paywall__input}>
                    <input
                      id="uid"
                      type="text"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      className={styles.paywall__input_field}
                    />
                    <div className={styles.paywall__input_actions}>
                      <button className={styles.paywall__help_button}>
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

                {/* Payment Methods */}
                <div className={styles.paywall__payment_methods}>
                  <div className={styles.paywall__payment_grid}>
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        data-testid={method.testId}
                        className={`${styles.paywall__payment_method} ${
                          selectedPayment === method.id
                            ? styles["paywall__payment_method--active"]
                            : ""
                        }`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className={styles.paywall__payment_content}>
                          <img
                            src={method.icon}
                            alt={method.name}
                            className={styles.paywall__payment_icon}
                          />
                          <p className={styles.paywall__payment_text}>
                            {method.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className={styles.paywall__support}>
              <div className={styles.paywall__support_icon}>
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
              <div className={styles.paywall__support_text}>
                <p>Ты можешь поддержать любимчика</p>
                <a href="/about">В разделе “О нас”</a>
              </div>
              <button className={styles.paywall__tooltip_button}>
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

          {/* Separator */}
          <div className={styles.paywall__separator}></div>

          {/* Right Panel - Cart */}
          <div className={styles.paywall__cart}>
            <div className={styles.paywall__cart_header}>
              <h4 className={styles.paywall__cart_title}>
                Товары <span>{totalPrice} ₽</span>
              </h4>
              <p className={styles.paywall__cart_count}>
                {cartItems.length} товар{cartItems.length > 1 ? "а" : ""}
              </p>
            </div>

            <div className={styles.paywall__cart_content}>
              <div className={styles.paywall__cart_items}>
                {cartItems.map((item) => (
                  <ProductCartItem product={item} productName={productName} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          className={styles.paywall__continue_button}
          data-testid="create-order-button"
          disabled={!uid.trim()}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};
