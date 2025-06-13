import type { Service, Game, AvailableInBot } from "../../types";

export interface ItemGridProps {
  items: Service[] | Game[] | AvailableInBot[];
  type?: "square" | "rectangle";
}