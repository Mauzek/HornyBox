export interface ProductActionsProps {
  addToCart: (e: React.MouseEvent) => void;
  removeFromCart: () => void;
  initialQuantity: number;
}