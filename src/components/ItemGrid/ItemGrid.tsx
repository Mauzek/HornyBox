import React from "react";
import styles from "./ItemGrid.module.scss";
import type { ItemGridProps } from "./types";
import { ItemCard } from "../ItemCard";

export const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  gridType = "square",
  itemSize = "medium",
  split = false,
  id,
}) => {
  const firstSectionItems = items.slice(0, 2);
  const isPopular = id === "popular";

  return split ? (
    <>
      <section
        className={`${styles.grid_container} ${styles["grid_container--rectangle"]} ${styles["grid_container--primary"]}`}
      >
        {firstSectionItems.map((item) => (
          <ItemCard
            item={item}
            key={`first-${item.id}`}
            type="rectangle"
            size="large"
          />
        ))}
      </section>

      <section
        className={`${styles.grid_container} ${
          styles["grid_container--square"]
        } ${styles["grid_container--secondary"]} ${
          styles[`grid_container--${itemSize}`]
        }`}
      >
        {items.map((item, index) => (
          <ItemCard
            item={item}
            key={`all-${item.id}`}
            type="square"
            data-index={index}
            size={itemSize}
          />
        ))}
      </section>
    </>
  ) : (
    <section
      className={`${styles.grid_container} ${
        styles[`grid_container--${gridType}`]
      } ${styles[`grid_container--${itemSize}`]} ${
        isPopular && styles["grid_container--popular"]
      }`}
    >
      {items.map((item, index) => (
        <ItemCard
          item={item}
          key={item.id}
          type={gridType}
          data-index={index}
          size={itemSize}
        />
      ))}
    </section>
  );
};
