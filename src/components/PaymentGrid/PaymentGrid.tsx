import React from "react";
import styles from "./PaymentGrid.module.scss";
import type { PaymentGridProps } from "./types";
import { PaymentMethod } from "./PaymentMethod";

export const PaymentGrid: React.FC<PaymentGridProps> = ({
  payments,
  selectedPayment,
  setSelectedPayment,
  className,
  style
}) => {
  return (
    <section className={`${styles.payment_grid} ${className}`} style={style} >
      {payments.map((method) => (
        <PaymentMethod
          key={method.id}
          method={method}
          isActive={selectedPayment === method.id}
          onSelect={setSelectedPayment}
        />
      ))}
    </section>
  );
};
