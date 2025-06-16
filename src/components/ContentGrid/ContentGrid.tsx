import React from "react";
import styles from "./ContentGrid.module.scss";
import { ContentArticleCard } from "./ContentArticleCard";
import { ContentVideoCard } from "./ContentVideoCard";
import type { ContentGridProps, ContentCardProps, ComponentMapKey, ItemTypes } from "./types";

const componentMap = {
  videos: ContentVideoCard,
  articles: ContentArticleCard,
} as const;

export const ContentGrid = <T extends ComponentMapKey>({
  id,
  items,
  gap = 10,
}: ContentGridProps<T>) => {
  const Component = componentMap[id] as React.FC<ContentCardProps<ItemTypes[T]>>;

  return (
    <section
      className={styles.content_grid_container}
      style={{ "--grid-gap": `${gap}px` } as React.CSSProperties}
    >
      {items.map((item) => (
        <Component key={item.id} item={item} />
      ))}
    </section>
  );
};
