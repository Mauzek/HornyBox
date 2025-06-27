import React from "react";
import { LuTriangleAlert } from "react-icons/lu";
import { icons } from "../../../assets"
import styles from "./PopupButton.module.scss";
import type { PopupButtonProps } from "./types";

export const PopupButton: React.FC<PopupButtonProps> = ({ type, onClick }) => {
  const buttonClass = `${styles.popup__button} ${styles[`popup__button--${type}`]}`;
  const iconClass = `${styles.popup__icon} ${styles[`popup__icon--${type}`]}`;

  const renderIcon = () => {
    switch (type) {
      case "bot":
        return <img src={icons.bot_popup} alt="Bot popup" className={iconClass} />;
      case "explanation":
        return <img src={icons.question_popup} alt="Explanation popup" className={iconClass} />;
      case "fullpack":
        return <LuTriangleAlert className={iconClass} />;
    }
  };

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={onClick}
      aria-label="Открыть информацию о товаре"
    >
      {renderIcon()}
    </button>
  );
};
