import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  LuUsersRound,
  LuFileQuestion ,
  LuMessageCircleQuestion ,
  LuHistory  ,
} from "react-icons/lu";
import { useClickOutside, useEscapeKey } from "../../../hooks";
import type { ActionMenuProps } from "./types";
import styles from "./ActionMenu.module.scss";

export const ActionMenu: React.FC<ActionMenuProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside(popupRef, onClose, isOpen);
  useEscapeKey(onClose, isOpen);
    console.log('render')
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {}, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={popupRef}
      className={`${styles.popup} ${
        isOpen ? styles["popup--visible"] : styles["popup--hidden"]
      }`}
      onClick={handleContentClick}
      role="dialog"
    >
      <ul className={styles.popup__list}>
        <li className={styles.popup__item}>
          <Link to="/about">
            <span className={styles.popup__icon}>
              <LuUsersRound />
            </span>
            <span className={styles.popup__text}>О нас</span>
          </Link>
        </li>
        <li className={styles.popup__item}>
          <Link to="/faq">
            <span className={styles.popup__icon}>
              <LuFileQuestion />
            </span>
            <span className={styles.popup__text}>FAQ</span>
          </Link>
        </li>
        <li className={styles.popup__item}>
          <a
            href="https://t.me/HornySupport_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.popup__icon}>
              <LuMessageCircleQuestion />
            </span>
            <span className={styles.popup__text}>Поддержка</span>
          </a>
        </li>
        <li className={styles.popup__item}>
          <button className={styles.popup__item}>
            <span className={styles.popup__icon}>
              <LuHistory />
            </span>
            <span className={styles.popup__text}>История</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
