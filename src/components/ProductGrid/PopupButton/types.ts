export interface PopupButtonProps {
  type: "bot" | "explanation" | "fullpack" | "none";
  onClick?: (e: React.MouseEvent) => void;
}