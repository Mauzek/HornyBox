import type { Article, Video } from "../../types";

export type ItemTypes = {
  videos: Video;
  articles: Article;
};

export type ComponentMapKey = keyof ItemTypes;

export interface ContentGridProps<T extends ComponentMapKey> {
  id: T;
  items: ItemTypes[T][];
  gap?: number;
}

export interface ContentCardProps<T> {
  item: T;
}