import React from "react";
import styles from "./ItemGrid.module.scss";
import type { ItemGridProps } from "./types";
import { ItemCard } from "../ItemCard";
export const ItemGrid: React.FC<ItemGridProps> = ({ items, type = "square" }) => {
  return (
    <section className={`${styles.grid_container} ${styles[`grid_container--${type}`]}`}>
      {items.map((item) => <ItemCard item={item} key={item.id} type={type}/>)}
    </section>
  );
};
