import React from "react";
import styles from "./VideoPlayer.module.scss";
import { useEffect, useRef, useState } from "react";
import { useClickOutside, useEscapeKey } from "../../../hooks";
import { IoMdClose } from "react-icons/io";
import type { VideoPlayerProps } from "./types";

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  isOpen,
  onClose,
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
        <iframe
          className={styles.popup__video}
          src={videoUrl}
          title={title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};
