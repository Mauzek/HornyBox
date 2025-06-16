import React from "react";
import { Link } from "react-router-dom";
import styles from "./ItemCard.module.scss";
import type { ItemCardProps } from "./types";

/*
  - сделать LazyLoadImage для картинок в карточках
  - если время будет, обновить данные в API
*/ 

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  type = "square",
  size = "medium",
}) => {
  const isExternalLink = item.link && item.link.startsWith("https");
  const internalLink = !isExternalLink
    ? `${item.type}s/${item.link.toLowerCase().replace(/\s+/g, "_").replace(/:/g, "")}` : '/'

  return isExternalLink ? (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      key={item.id}
      className={`${styles.grid_item} ${styles[`grid_item--${type}`]} ${
        styles[`grid_item--${size}`]
      }`}
    >
      <picture>
        <source srcSet={item.imageMobile} media="(max-width: 989px)" />
        <img src={item.imagePC} alt={item.title} />
      </picture>
      <div className={styles.grid_item__card_content}>
        <h4 className={styles.grid_item__card_title}>{item.title}</h4>
      </div>
    </a>
  ) : (
    <Link
      to={internalLink}
      key={item.id}
      className={`${styles.grid_item} ${styles[`grid_item--${type}`]} ${
        styles[`grid_item--${size}`]
      }`}
    >
      <picture className={styles.grid_item__image_wrapper}>
        <source srcSet={item.imageMobile} media="(max-width: 989px)" />
        <img src={item.imagePC} alt={item.title} />
      </picture>
      <div className={styles.grid_item__card_content}>
        <h4 className={styles.grid_item__card_title}>{item.title}</h4>
      </div>
    </Link>
  );
};
