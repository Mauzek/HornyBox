import { useState, useEffect } from "react";
import { LuX, LuCheck, LuTriangleAlert, LuInfo   } from "react-icons/lu";
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
        return <LuCheck/>;
      case "error":
        return <LuX />;
      case "warning":
        return <LuTriangleAlert />;
      case "info":
        return <LuInfo/>;
      default:
        return <LuInfo/>;
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
