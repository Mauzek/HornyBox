import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside, useEscapeKey } from "../../../hooks";
import type { OrderHistoryProps } from "./types";
import styles from "./OrderHistory.module.scss";

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  isOpen,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useClickOutside(popupRef, onClose, isOpen);
  useEscapeKey(onClose, isOpen);
  // console.log('render OrderHistory');

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(showTimer);
    } else {
      setIsVisible(false);
      const hideTimer = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => clearTimeout(hideTimer);
    }
  }, [isOpen]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isMounted) return null;

  return (
    <div
      ref={popupRef}
      className={`${styles.popup} ${
        isVisible ? styles["popup--visible"] : styles["popup--hidden"]
      }`}
      onClick={handleContentClick}
      role="dialog"
      aria-labelledby="order-history-title"
      aria-describedby="order-history-content"
    >
      <header>
        <h2 className={styles.popup__title} id="order-history-title">
          История заказов
        </h2>
      </header>
      <div className={styles.popup__content} id="order-history-content">
        <div className={styles.popup__message}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "#c8ff00" }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
            <line x1="9" x2="9.01" y1="9" y2="9"></line>
            <line x1="15" x2="15.01" y1="9" y2="9"></line>
          </svg>
          <p className={styles.popup__text}>У вас нет купленных товаров</p>
        </div>
      </div>
    </div>
  );
};
