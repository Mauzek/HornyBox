import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import styles from "./Pagination.module.scss";
import type { PaginationProps } from "./types";

export const Pagination = ({
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  onPrevPage,
  onNextPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__button}
        onClick={onPrevPage}
        disabled={!hasPrevPage}
      >
        <LuChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`${styles.pagination__button} ${
            currentPage === index + 1
              ? styles["pagination__button--active"]
              : ""
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={styles.pagination__button}
        onClick={onNextPage}
        disabled={!hasNextPage}
      >
        <LuChevronRight />
      </button>
    </div>
  );
};
