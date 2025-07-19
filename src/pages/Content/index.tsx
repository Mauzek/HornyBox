import { useState, useMemo, useEffect, useCallback } from "react";
import { useGetArticlesQuery } from "../../store";
import styles from "./Content.module.scss";
import { LuCheck } from "react-icons/lu";
import { ContentGrid, Pagination, Preloader } from "../../components";
import type { Article } from "../../types";
import { usePagination, usePopup } from "../../hooks";
import { usePreloader } from "../../hooks/usePreloader";
import { FiltersMenu } from "../../components/Popups";

export const ContentPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const { isVisible, hide, toggle } = usePopup();
  const { data, isLoading } = useGetArticlesQuery();

  const { shouldShowPreloader, handlePreloaderComplete } = usePreloader({
    isLoading,
  });

  const categories = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map((item) => item.gameName))).sort();
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedCategories.size === 0) return data;

    return data.filter((item) => selectedCategories.has(item.gameName));
  }, [data, selectedCategories]);

  const {
    currentPage,
    goToPage,
    currentPageData,
    goToNextPage,
    goToPrevPage,
    hasNextPage,
    hasPrevPage,
    totalPages,
  } = usePagination<Article>({
    data: filteredData,
    itemsPerPage: 16,
  });

  const handleCategoryToggle = useCallback(
    (category: string) => {
      setSelectedCategories((prev) => {
        if (prev.has(category)) {
          const newSet = new Set(prev);
          newSet.delete(category);
          return newSet;
        } else {
          return new Set([...prev, category]);
        }
      });
      goToPage(1);
    },
    [goToPage]
  );

  useEffect(() => {
    document.title = "Гайды, статьи, игровые новости на HornyBox";
  }, []);

  if (!data) {
    return (
      <Preloader isLoading={isLoading} onComplete={handlePreloaderComplete} />
    );
  }

  return (
    <>
      {shouldShowPreloader && (
        <Preloader isLoading={isLoading} onComplete={handlePreloaderComplete} />
      )}
      <section className={styles.page}>
        <div className={styles.page__header}>
          <h1 className={styles.page__title}>Статьи</h1>
          <div className={styles.page__nav}>
            {categories.map((category) => (
              <label key={category} className={styles.page__filter}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={selectedCategories.has(category)}
                  data-state={
                    selectedCategories.has(category) ? "checked" : "unchecked"
                  }
                  className={styles.page__filterCheckbox}
                  onClick={() => handleCategoryToggle(category)}
                >
                  <span className={styles.page__checkboxIcon}>
                    <LuCheck className={styles.page__checkIcon} />
                  </span>
                </button>
                {category}
              </label>
            ))}
          </div>
        </div>

        <button className={styles.page__button} onClick={toggle}>
          Фильтры
        </button>

        <div className={styles.page__info}>
          <p>
            Показано {currentPageData.length} из {filteredData.length} статей
            {selectedCategories.size > 0 && (
              <span>
                {" "}
                (отфильтровано по: {Array.from(selectedCategories).join(", ")})
              </span>
            )}
          </p>
          {selectedCategories.size > 0 && (
            <button
              className={styles.page__clearFilters}
              onClick={() => {
                setSelectedCategories(new Set());
                goToPage(1);
              }}
            >
              Очистить фильтры
            </button>
          )}
        </div>

        <ContentGrid id="articles" items={currentPageData} gap={15} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={goToNextPage}
            onPageChange={goToPage}
            onPrevPage={goToPrevPage}
            totalPages={totalPages}
          />
        )}

        <FiltersMenu
          filters={categories}
          onClose={hide}
          isOpen={isVisible}
          onFilterToggle={handleCategoryToggle}
          selectedFilters={selectedCategories}
          title="Фильтры"
        />
      </section>
    </>
  );
};
