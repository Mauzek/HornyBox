import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArticleSlide.module.scss";
import type { ArticleSlideProps } from "./types";

export const ArticleSlide: React.FC<ArticleSlideProps> = ({
  slide,
  isActive,
}) => {
  const isExternalLink = slide.link && slide.link.startsWith("https");
  const linkTo = !isExternalLink ? `/games/${slide.gameName.toLowerCase().replace(/\s+/g, "_").replace(/:/g, "")}` : slide.link;
  
  const linkContent = (
    <>
      <div className={styles["slide__image-container"]}>
        <picture className={styles.slide__picture}>
          <source srcSet={slide.imageMobile} media="(max-width: 640px)" />
          <img
            src={slide.imagePC}
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
    </>
  );
  
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={`${styles.slide} ${isActive ? styles["slide--active"] : ""}`}
    >
      {isExternalLink ? (
        <a
          href={linkTo}
          className={styles.slide__link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkContent}
        </a>
      ) : (
        <Link
          to={linkTo}
          className={styles.slide__link}
        >
          {linkContent}
        </Link>
      )}
    </div>
  );
};
