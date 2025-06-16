import React from "react";
import { Link } from "react-router-dom";
import styles from "./ContentArticleCard.module.scss";
import type { ContentCardProps } from "../types";
import { images } from "../../../assets";
import type { Article } from "../../../types";
import { formatDate } from "../../../utils";

export const ContentArticleCard: React.FC<ContentCardProps<Article>> = ({ item }) => {
  return (
    <Link to={'/'} className={styles.card}>
      <div className={styles.card__image_wrapper}>
        <picture>
          <source
            srcSet={item.image}
            type="image/webp"
            media="(max-width: 989px)"
          />
          <img
            src={item.image}
            alt={item.title}
            className={styles.card__image}
          />
        </picture>
        <div className={styles.card__badge}>{item.gameName}</div>
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{item.title}</h3>
      </div>
      <div className={styles.card__footer}>
        <div className={styles.card__author}>
          <img className={styles.card__logo} src={images.logoSmall} alt="logo" />
          <p className={styles.card__text}>{item.author}</p>
        </div>
        <div className={styles.card__date}>
          <p className={`${styles.card__text} ${styles["card__text--date"]}`} >{formatDate(item.uploadDate)}</p>
        </div>
      </div>
    </Link>
  );
};
