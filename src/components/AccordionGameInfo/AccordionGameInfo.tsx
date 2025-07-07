import React, { useState } from "react";
import styles from "./AccordionGameInfo.module.scss";
import { LuChevronDown } from "react-icons/lu";
import type { AccordionGameInfoProps } from "./types";

export const AccordionGameInfo: React.FC<AccordionGameInfoProps> = ({title, description}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.expandable}>
      <div
        className={styles.expandable__header}
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <h4>{title}</h4>
        <LuChevronDown className={`${styles.expandable__arrow} ${
            isOpen ? styles["expandable__arrow--open"] : ""
          }`}/>
      </div>

      <div
        className={styles.expandable__content}
        style={{ maxHeight: isOpen ? "1499px" : "6.2rem" }}
        aria-hidden={!isOpen}
      >
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};