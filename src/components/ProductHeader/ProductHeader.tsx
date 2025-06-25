import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductHeader.module.scss";
import type { ProductHeaderProps } from "./type";

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  image,
  categories,
}) => {
  const { gameName, category } = useParams();
  const allCategory = [
    { id: 0, name: "Все товары", description: title, link: undefined },
    ...categories,
  ];
  const currentCategory = allCategory.find((item) => item.link === category);
  return (
    <div className={styles.header}>
      <img src={image} alt={title} className={styles.header__image} />
      <div className={styles.header__nav}>
        <h1 className={styles.header__title}>{currentCategory?.description}</h1>
        <ul className={styles.header__list}>
          {allCategory.map((item) => (
            <li key={item.id} className={styles.header__item}>
              <Link
                to={
                  item.link
                    ? `/games/${gameName}/${item.link}`
                    : `/games/${gameName}`
                }
                className={`${styles.header__link} ${
                  category === item.link || (!category && !item.link)
                    ? styles["header__link--active"]
                    : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
