import React from "react";
import styles from "./Section.module.scss";
import type { SectionProps } from "./types";
import { icons } from "../../assets";
import { Link } from "react-router-dom";
export const Section: React.FC<SectionProps> = ({ children, title, id }) => {
  const linkTo = id === "articles" ? "/content" : `/${id}`;
  return (
    <section id={id} className={styles.section}>
      <div className={styles.section__title_wrapper}>
        <h2 className={styles.section__title}>
          {title}
          <img src={icons[id]} alt={title} className={`${(id === "videos" || id === "articles") ? styles.section__icon : ""} ${id === "videos" ? styles.section__icon_video : ""}`} />
        </h2>
        {(id === "videos" || id === "articles") && (
          <Link to={linkTo} className={styles.section__link}>
            <h3 className={styles.section__link_title}>Все {title.toLowerCase()}</h3>
          </Link>
        )}
      </div>
      <div className={styles.section__content}>{children}</div>
    </section>
  );
};
