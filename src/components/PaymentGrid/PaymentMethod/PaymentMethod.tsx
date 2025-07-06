import React from "react";
import styles from "./PaymentMethod.module.scss";
import type { PaymentMethodProps } from "./types";

export const PaymentMethod: React.FC<PaymentMethodProps> = React.memo(
  ({ method, isActive, onSelect }) => {
    return (
      <button
        key={method.id}
        type="button"
        className={`${styles.method} ${
          isActive ? styles["method--active"] : ""
        }`}
        onClick={() => onSelect(method.id)}
      >
        <div className={styles.method__content}>
          <img
            src={method.icon}
            alt={method.name}
            className={styles.method__icon}
          />
          <p className={styles.method__text}>{method.name}</p>
        </div>
      </button>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isActive === nextProps.isActive;
  }
);
