import React from "react";
import styles from "./ContentVideoCard.module.scss";
import type { ContentCardProps } from "../types";
import type { Video } from "../../../types";
import { formatDate } from "../../../utils";
import { VideoPlayer } from "../../Popups";
import { usePopup } from "../../../hooks";

export const ContentVideoCard: React.FC<ContentCardProps<Video>> = ({
  item,
}) => {
  const { isVisible, hide, toggle } = usePopup();
  return (
    <>
      <button className={styles.card} onClick={toggle}>
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
        <p className={styles.card__date}>{formatDate(item.uploadDate)}</p>
        <p className={styles.card__title}>{item.title}</p>
        <div>
          <p>&nbsp;&nbsp;</p>
        </div>
      </button>
        <VideoPlayer
          isOpen={isVisible}
          onClose={hide}
          videoUrl={item.contentUrl}
          title={item.title}
        />
    </>
  );
};
