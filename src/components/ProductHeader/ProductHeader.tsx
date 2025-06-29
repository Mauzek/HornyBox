import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductHeader.module.scss";
import { flags } from "../../assets";
import type { ProductHeaderProps } from "./type";

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  image,
  categories,
  types = [],
}) => {
  const { gameName, category } = useParams();
  const allCategory = [
    { id: 0, name: "Все товары", description: title, link: undefined },
    ...categories,
  ];
  const currentCategory = allCategory.find((item) => item.link === category);

  const categoryList = (
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
  );

  const typesList = types.length > 0 && (
    <ul className={`${styles.header__list} ${styles["header__list--types"]}`}>
      {types.map((item) => (
        <li key={item.id} className={styles.header__item}>
          <Link
            to={`/games/${item.link}`}
            className={`${styles.header__link} ${styles["header__link--type"]} 
                  ${
                    gameName === item.link || (!gameName && !item.link)
                      ? styles["header__link--active"]
                      : ""
                  }`}
          >
            {item.flag && (
              <img
                src={flags[item.flag]}
                alt={item.name}
                className={styles.header__flag}
              />
            )}
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`${styles.header} ${
        types.length > 0 && styles["header--margin"]
      }`}
    >
      <div className={styles.header__content}>
        <img src={image} alt={title} className={styles.header__image} />
        <div className={styles.header__nav}>
          <h1 className={styles.header__title}>
            {currentCategory?.description}
          </h1>
          {typesList}
          {types.length === 0 && categoryList}
        </div>
      </div>
      {types.length > 0 && categoryList}
    </div>
  );
};
