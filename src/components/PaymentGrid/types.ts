import type { Payment } from "../../types";

export interface PaymentGridProps{
    payments: Payment[];
    selectedPayment: number;
    setSelectedPayment: (paymentId: number) => void;
}