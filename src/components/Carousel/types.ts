import type { Banner } from "../../types";

export interface CarouselProps {
  slides: Banner[];
  interval?: number;
  type: "banner" | "article" ;
}