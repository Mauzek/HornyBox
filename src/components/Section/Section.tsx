import React from "react";
import styles from "./Section.module.scss";
import type { SectionProps } from "./types";
import { icons } from "../../assets";
export const Section: React.FC<SectionProps> = ({ children, title, id }) => {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.section__title}>
        {title}
        <img src={icons[id]} alt={title} className={styles.section__icon} />
      </h2>
      <div className={styles.section__content}>{children}</div>
    </section>
  );
};
