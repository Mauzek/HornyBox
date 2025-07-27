type ToastType = "success" | "error" | "info" | "warning";
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "center";

export interface ToastProps {
  message: string;
  type: ToastType;
  position?: ToastPosition;
  duration?: number;
}
