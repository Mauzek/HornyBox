import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.scss";
import { images } from "../../assets";
import type { PreloaderProps } from "./types";

export const Preloader: React.FC<PreloaderProps> = ({
  isLoading,
  onComplete,
}) => {
  const [stage, setStage] = useState<
    "loading" | "fadeOut" | "curtainOpen" | "complete"
  >("loading");
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setShouldShow(true);
      setStage("loading");
      return;
    }
    const logoDisplayTime = 800; 
    const fadeOutTime = 600; 
    const curtainOpenTime = 1200; 

    const fadeOutTimer = setTimeout(() => {
      setStage("fadeOut");
    }, logoDisplayTime);

    const curtainTimer = setTimeout(() => {
      setStage("curtainOpen");
    }, logoDisplayTime + fadeOutTime);

    const completeTimer = setTimeout(() => {
      setStage("complete");
      setShouldShow(false);
      onComplete?.();
    }, logoDisplayTime + fadeOutTime + curtainOpenTime);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(curtainTimer);
      clearTimeout(completeTimer);
    };
  }, [isLoading, onComplete]);

  if (!shouldShow) return null;
  
  return (
    <div
      className={`${styles.preloader} ${
        stage === "complete" ? styles["preloader--completing"] : ""
      }`}
    >
      <div
        className={`${styles.content} ${
          stage === "fadeOut" || stage === "curtainOpen" || stage === "complete"
            ? styles["content--fadeOut"]
            : ""
        }`}
      >
        <div className={styles.logo}>
          <div className={styles.logo__icon}>
            <svg viewBox="0 0 200 200" width="200" height="200">
              <image
                href={images.logoSmallSvg}
                x="0"
                y="0"
                width="200"
                height="200"
              />
            </svg>
          </div>
          <h1 className={styles.logo__text}>HornyBox</h1>
        </div>

        <div className={styles.loader}>
          <div className={styles.loader__bar}></div>
        </div>
      </div>

      <div
        className={`${styles.curtain} ${styles.curtain__left} ${
          stage === "curtainOpen" || stage === "complete"
            ? styles["curtain--open"]
            : ""
        }`}
      />

      <div
        className={`${styles.curtain} ${styles.curtain__right} ${
          stage === "curtainOpen" || stage === "complete"
            ? styles["curtain--open"]
            : ""
        }`}
      />
    </div>
  );
};
