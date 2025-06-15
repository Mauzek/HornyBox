import React from "react";
import { Link } from "react-router-dom";
import type { BannerSlideProps } from "./types";
import styles from "./BannerSlide.module.scss";

export const BannerSlide: React.FC<BannerSlideProps> = React.memo(({
  slide,
  isActive,
}) => {
  const linkTo = slide.link ? `/games/${slide.gameName.toLowerCase().replace(/\s+/g, "_").replace(/:/g, "")}` : '/';
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={`${styles.slide} ${isActive ? styles["slide--active"] : ""}`}
    >
      <div className={styles.slide__content}>
        <Link
          to={linkTo}
          className={styles.slide__link}
        ></Link>

        <picture className={styles.slide__picture}>
          <source srcSet={slide.imageMobile} media="(max-width: 640px)" />
          <img
            src={slide.imagePC}
            alt={slide.title}
            className={styles.slide__image}
            decoding="auto"
          />
        </picture>

        <div className={styles["slide__text-overlay"]}>
          <p>Самое выгодное пополнение</p>
        </div>
      </div>

      <div className={styles["slide__title-mobile"]}>
        <p className={styles["slide__title-mobile-text"]}>{slide.title}</p>
        {slide.description && (
          <p className={styles["slide__description-mobile"]}>
            {slide.description.header}
          </p>
        )}
      </div>
    </div>
  );
})
