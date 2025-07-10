export interface PaginationProps{
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
}