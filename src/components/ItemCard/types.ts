export interface ItemCardProps {
  item: {
    id: number;
    title: string;
    imagePC: string;
    imageMobile: string;
    link: string;
  };
  type?: "square" | "rectangle";
}