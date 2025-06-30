import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductHeader.module.scss";
import { flags } from "../../assets";
import { useClickOutside } from "../../hooks/useClickOutside";
import type { ProductHeaderProps } from "./type";

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  image,
  categories,
  types = [],
}) => {
  const { gameName, category } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(
    dropdownRef,
    () => setIsDropdownOpen(false),
    isDropdownOpen,
    dropdownButtonRef
  );

  const allCategory = [
    { id: 0, name: "Все товары", description: title, link: undefined },
    ...categories,
  ];
  const currentCategory = allCategory.find((item) => item.link === category);

  const activeType = types.find((item) => gameName === item.link) || types[0];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTypeClick = (e: React.MouseEvent, isActive: boolean) => {
    if (isActive) {
      e.preventDefault();
      return;
    }
    setIsDropdownOpen(false);
  };

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
      {types.map((item) => {
        const isActive = gameName === item.link || (!gameName && !item.link);

        return (
          <li key={item.id} className={styles.header__item}>
            <Link
              to={`/games/${item.link}`}
              className={`${styles.header__link} ${
                styles["header__link--type"]
              } 
                    ${isActive ? styles["header__link--active"] : ""}`}
              onClick={(e) => {
                if (isActive) {
                  e.preventDefault();
                }
              }}
              style={{
                cursor: isActive ? "default" : "pointer",
                pointerEvents: isActive ? "none" : "auto",
              }}
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
        );
      })}
    </ul>
  );

  const typeDropdownMobile = types.length > 0 && (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        ref={dropdownButtonRef}
        className={styles.dropdown__button}
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <span className={styles.dropdown__current}>
          {activeType?.flag && (
            <img
              src={flags[activeType.flag]}
              alt={activeType.name}
              className={styles.header__flag}
            />
          )}
          {activeType?.name || "Выберите игру"}
        </span>
        <svg
          className={`${styles.dropdown__arrow} ${
            isDropdownOpen ? styles["dropdown__arrow--open"] : ""
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`${styles.dropdown__menu} ${
          isDropdownOpen ? styles["dropdown__menu--open"] : ""
        }`}
      >
        {types.map((item) => {
          const isActive = gameName === item.link || (!gameName && !item.link);

          return (
            <Link
              key={item.id}
              to={`/games/${item.link}`}
              className={`${styles.dropdown__item} ${
                isActive ? styles["dropdown__item--active"] : ""
              }`}
              onClick={(e) => handleTypeClick(e, isActive)}
              style={{
                cursor: isActive ? "default" : "pointer",
              }}
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
          );
        })}
      </div>
    </div>
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
          {types.length > 0 && (
            <>
              <div className={styles.header__desktop}>{typesList}</div>
              <div className={styles.header__mobile}>{typeDropdownMobile}</div>
            </>
          )}
          {types.length === 0 && categoryList}
        </div>
      </div>
      {types.length > 0 && categoryList}
    </div>
  );
};
