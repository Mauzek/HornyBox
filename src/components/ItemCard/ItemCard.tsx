import React from "react";
import { Link } from "react-router-dom";
import styles from "./ItemCard.module.scss";
import type { ItemCardProps } from "./types";

export const ItemCard: React.FC<ItemCardProps> = ({ item, type = "square" }) => {
  const isExternalLink = item.link && item.link.startsWith("https");
  const internalLink = !isExternalLink
    ? `game/${item.link.toLowerCase().replace(" ", "_")}`
    : "";

  return isExternalLink ? (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      key={item.id}
      className={`${styles.grid_item} ${styles[`grid_item--${type}`]}`}
    >
      <picture>
        <source srcSet={item.imageMobile} media="(max-width: 640px)" />
        <img src={item.imagePC} alt={item.title} />
      </picture>
      <h4>{item.title}</h4>
    </a>
  ) : (
    <Link to={internalLink} key={item.id} className={`${styles.grid_item} ${styles[`grid_item--${type}`]}`}>
      <picture>
        <source srcSet={item.imageMobile} media="(max-width: 640px)" />
        <img src={item.imagePC} alt={item.title} />
      </picture>
      <div>
        <h4>{item.title}</h4>
      </div>
    </Link>
  );
};
