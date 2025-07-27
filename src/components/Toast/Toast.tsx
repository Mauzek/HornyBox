import { useState, useEffect } from "react";
import { FiCheck, FiX, FiInfo, FiAlertTriangle } from "react-icons/fi";
import type { ToastProps } from "./types";
import styles from "./Toast.module.scss";

export const Toast = ({
  message,
  type,
  position = "top-center",
  duration = 2500,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FiCheck size={20} />;
      case "error":
        return <FiX size={20} />;
      case "warning":
        return <FiAlertTriangle size={20} />;
      case "info":
        return <FiInfo size={20} />;
      default:
        return <FiInfo size={20} />;
    }
  };

  return (
    <div
      className={`${styles.toastContainer} ${
        styles[`toastContainer--${position}`]
      }`}
    >
      <div className={`${styles.toast} ${styles[`toast--${type}`]}`}>
        <div className={styles.toast__icon}>{getIcon()}</div>
        <div className={styles.toast__message}>{message}</div>
      </div>
    </div>
  );
};
