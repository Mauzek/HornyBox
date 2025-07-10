import { useCallback, useMemo, useState } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentPageData: T[];
  pagesData: T[][];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export const usePagination = <T>({
  data,
  itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagesData = useMemo(() => {
    const chunks: T[][] = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      chunks.push(data.slice(i, i + itemsPerPage));
    }
    return chunks;
  }, [data, itemsPerPage]);

  const totalPages = pagesData.length;
  const currentPageData = pagesData[currentPage - 1] || [];
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const goToPrevPage = useCallback(() => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [hasPrevPage]);

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    if (totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    currentPageData,
    pagesData,
    hasNextPage,
    hasPrevPage,
    goToPage,
    goToPrevPage,
    goToNextPage,
    goToFirstPage,
    goToLastPage,
  };
};
