import type { CartItem } from "../../../types";

export interface PaywallFormProps {
  onClose?: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  payment: 'uid' | 'email';
  productName: string;
}