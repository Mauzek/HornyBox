import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuUsersRound,
  LuFileQuestion,
  LuMessageCircleQuestion,
  LuHistory,
} from "react-icons/lu";
import { useClickOutside, useEscapeKey, usePopup } from "../../../hooks";
import type { ActionMenuProps } from "./types";
import styles from "./ActionMenu.module.scss";
import { OrderHistory } from "../OrderHistory";

export const ActionMenu: React.FC<ActionMenuProps> = ({
  isOpen,
  onClose,
  toggleButtonRef,
  isGamePage,
  user,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const {isVisible: isVisibleHistory, toggle, hide} = usePopup();
  useClickOutside(popupRef, onClose, isOpen, toggleButtonRef);
  useEscapeKey(onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 1);
      return () => clearTimeout(showTimer);
    } else {
      setIsVisible(false);
      const hideTimer = setTimeout(() => {
        setIsMounted(false);
      }, 50);
      return () => clearTimeout(hideTimer);
    }
  }, [isOpen]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleHistoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
    console.log("История clicked");

  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isMounted) return null;

  return (
    <>
    <div
      ref={popupRef}
      className={`${styles.popup} ${
        isVisible ? styles["popup--visible"] : styles["popup--hidden"]
      } ${isGamePage ? styles["popup--game-page"] : ""}`}
      onClick={handleContentClick}
      role="dialog"
    >
      <ul className={styles.popup__list}>
        <li className={styles.popup__item}>
          <Link to="/about" onClick={handleLinkClick}>
            <span className={styles.popup__icon}>
              <LuUsersRound />
            </span>
            <span className={styles.popup__text}>О нас</span>
          </Link>
        </li>
        <li className={styles.popup__item}>
          <Link to="/faq" onClick={handleLinkClick}>
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
            onClick={handleLinkClick}
          >
            <span className={styles.popup__icon}>
              <LuMessageCircleQuestion />
            </span>
            <span className={styles.popup__text}>Поддержка</span>
          </a>
        </li>
        {user && (
          <li className={styles.popup__item}>
            <button onClick={handleHistoryClick}>
              <span className={styles.popup__icon}>
                <LuHistory />
              </span>
              <span className={styles.popup__text}>История</span>
            </button>
          </li>
        )}
      </ul>
    </div>
          <OrderHistory  isOpen={isVisibleHistory} onClose={hide} />
    </>
  );
};
