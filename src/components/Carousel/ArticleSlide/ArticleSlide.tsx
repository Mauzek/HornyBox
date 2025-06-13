import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArticleSlide.module.scss";
import type { ArticleSlideProps } from "./types";

export const ArticleSlide: React.FC<ArticleSlideProps> = ({
  slide,
  isActive,
}) => {
  const linkTo = slide.link ? `/game/${slide.gameName.toLowerCase().replace(/\s+/g, "_").replace(/:/g, "")}` : '/';
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={`${styles.slide} ${isActive ? styles["slide--active"] : ""}`}
    >
      <Link
        to={linkTo}
        className={styles.slide__link}
      >
        <div className={styles["slide__image-container"]}>
          <picture className={styles.slide__picture}>
            <source srcSet={slide.imageMobile} media="(max-width: 640px)" />
            <img
              src={slide.imagePc}
              alt={slide.title}
              className={styles.slide__image}
              decoding="auto"
            />
          </picture>
        </div>

        <div className={styles.slide__content}>
          <div className={styles["slide__badges-container"]}>
            <span className={styles.slide__badge}>{slide.gameName}</span>
            {slide.badge && (
              <span className={styles.slide__badge}>{slide.badge}</span>
            )}
          </div>
          <h3 className={styles.slide__title}>{slide.title}</h3>

          {slide.description && (
            <div className={styles.slide__description}>
              <div
                className={styles["slide__description-body"]}
                dangerouslySetInnerHTML={{ __html: slide.description.body }}
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
