import type { Payment } from "../../../types";

export interface PaymentMethodProps {
  method: Payment;
  isActive: boolean;
  onSelect: (paymentId: number) => void;
}