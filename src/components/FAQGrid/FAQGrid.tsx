import React, { useCallback, useState } from "react";
import styles from "./FAQGrid.module.scss";
import { Accordion } from "./Accordion";
import type { FAQProps } from "./types";

export const FAQGrid: React.FC<FAQProps> = ({items}) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleAccordion = useCallback((id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);
  
  return (
    <div className={styles.grid_container}>
      {items.map(({ id, question, answer }) => (
        <Accordion
          key={id}
          id={id}
          title={question}
          content={answer}
          isOpen={activeId === id}
          onToggle={toggleAccordion}
        />
      ))}
    </div>
  );
};
