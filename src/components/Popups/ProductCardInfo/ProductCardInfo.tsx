import React from "react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside, useEscapeKey } from "../../../hooks";
import { IoMdClose } from "react-icons/io";
import styles from "./ProductCardInfo.module.scss";
import type { ProductCardInfoProps } from "./types";

export const ProductCardInfo: React.FC<ProductCardInfoProps> = ({
  isOpen,
  onClose,
  content,
  type,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useClickOutside(popupRef, onClose, isOpen);
  useEscapeKey(onClose, isOpen);

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

  const renderButton = () => {
    switch (type) {
      case "bot":
        return (
          <a
            href="https://t.me/HornyBox_bot"
            target="_blank"
            className={`${styles.popup__button} ${styles["popup__button--green"]} ${styles.popup__link}`}
          >
            Перейти в бот
          </a>
        );
      case "fullpack":
        return (
          <div className={styles.popup__button_container}>
            <button
              onClick={onClose}
              className={`${styles.popup__button} ${styles["popup__button--green"]}`}
            >
              Понятно
            </button>
            <button
              onClick={onClose}
              className={`${styles.popup__button} ${styles["popup__button--white"]}`}
            >
              Больше не показывать
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
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
        <div
          className={styles.popup__content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {renderButton()}
      </div>
    </div>
  );
};
