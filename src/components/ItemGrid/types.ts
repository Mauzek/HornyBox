import type { Service, Game, AvailableInBot } from "../../types";

export interface ItemGridProps {
  items: Service[] | Game[] | AvailableInBot[];
  gridType?: "square" | "rectangle";
  itemSize?: "small" | "medium" | "large";
  split?: boolean;
  id?: string;
}