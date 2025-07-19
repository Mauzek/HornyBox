import React, { useEffect, useRef, useState } from "react";
import type { FiltersMenuProps } from "./types";
import styles from "./FiltersMenu.module.scss";
import { useClickOutside, useEscapeKey } from "../../../hooks";
import { IoMdClose } from "react-icons/io";
import { LuCheck } from "react-icons/lu";

export const FiltersMenu = ({
  filters,
  selectedFilters,
  title,
  isOpen,
  onClose,
  onFilterToggle,
}: FiltersMenuProps) => {
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
          onClick={onClose}
          aria-label="Закрыть"
        >
          <IoMdClose className={styles.popup__close_icon} />
        </button>
        <div className={styles.popup__content}>
          <h2 className={styles.popup__title}>{title}</h2>
          <div className={styles.popup__nav}>
            {filters.map((category) => (
              <label key={category} className={styles.popup__filter}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={selectedFilters.has(category)}
                  data-state={
                    selectedFilters.has(category) ? "checked" : "unchecked"
                  }
                  className={styles.popup__filterCheckbox}
                  onClick={() => onFilterToggle(category)}
                >
                  <span className={styles.popup__checkboxIcon}>
                    <LuCheck className={styles.popup__checkIcon} />
                  </span>
                </button>
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
