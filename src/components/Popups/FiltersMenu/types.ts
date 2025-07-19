export interface FiltersMenuProps {
  filters: string[];
  selectedFilters: Set<string>;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onFilterToggle: (filter: string) => void;
}