import type { CartItem, Payments } from "../../../types";

export interface PaywallFormProps {
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  payments: Payments;
  productName: string;
  isOpen: boolean;
}