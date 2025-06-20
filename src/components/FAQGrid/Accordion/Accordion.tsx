import React, { useRef, useEffect, useState } from "react";
import styles from "./Accordion.module.scss";
import { LuPlus, LuMinus } from "react-icons/lu";
import type { AccordionProps } from "./types";

export const Accordion: React.FC<AccordionProps> = React.memo(
  ({ id, title, content, isOpen, onToggle }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState("0px");

    useEffect(() => {
      if (contentRef.current) {
        setHeight(isOpen ? `${contentRef.current.scrollHeight + 15}px` : "0px");
      }
    }, [isOpen]);

    return (
      <div className={styles.accordion}>
        <button
          className={styles.accordion__button}
          onClick={() => onToggle(id)}
          aria-expanded={isOpen}
        >
          <h5 className={styles.accordion__title}>{title}</h5>
          <div
            className={`${styles.accordion__icon} ${
              isOpen ? styles["accordion__icon--open"] : ""
            }`}
          >
            <LuPlus className={styles.accordion__iconPlus} />
            <LuMinus className={styles.accordion__iconMinus} />
          </div>
        </button>

        <div
          ref={contentRef}
          className={`${styles.accordion__content} ${
            isOpen && styles["accordion__content--open"]
          }`}
          style={{
            maxHeight: height,
          }}
          dangerouslySetInnerHTML={{__html: content}}
        >
        </div>
      </div>
    );
  }
);
