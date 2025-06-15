import type { AvailableInBot, Game, Service } from "../../types";

export interface ItemCardProps {
  item: Game | Service | AvailableInBot;
  type?: "square" | "rectangle";
  size?: "small" | "medium" | "large";
}