import type React from "react";
import { useRef } from "react";
import { useClickOutside, useEscapeKey } from "../../../hooks";
import type { OrderHistoryProps } from "./types";
import styles from "./OrderHistory.module.scss";

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  isOpen,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(popupRef, onClose, isOpen);
  useEscapeKey(onClose, isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={popupRef} className={styles.popup}>
      <h2 className={styles.popup__title}>История заказов</h2>
      <button 
        className={styles.popup__close} 
        onClick={onClose}
      >
        Закрыть
      </button>
    </div>
  );
};
