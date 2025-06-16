import React from "react";
import styles from "./ContentVideoCard.module.scss";
import type { ContentCardProps } from "../types";
import type { Video } from "../../../types";
import { formatDate } from "../../../utils";

export const ContentVideoCard: React.FC<ContentCardProps<Video>> = ({
  item,
}) => {

    
  return (
    <button className={styles.card} onClick={() => {}}>
      <picture>
        <source
          srcSet={item.image}
          type="image/webp"
          media="(max-width: 989px)"
        />
        <img src={item.image} alt={item.title} className={styles.card__image} />
      </picture>
      <p className={styles.card__date}>{formatDate(item.uploadDate)}</p>
      <p className={styles.card__title}>{item.title}</p>
      <div>
        <p>&nbsp;&nbsp;</p>
      </div>
    </button>
  );
};
