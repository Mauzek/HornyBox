import React from "react";
import styles from "./ProductGrid.module.scss";
import type { ProductGridProps } from "./types";
import { ProductCard } from "./ProductCard";

export const ProductGrid: React.FC<ProductGridProps> = ({ products, gameName }) => {
  return (
    <section className={styles.product_grid}>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} gameName={gameName} />;
      })}
    </section>
  );
};
