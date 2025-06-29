export interface ProductCardInfoProps {
    content: string;
    onClose: () => void;
    isOpen: boolean;
    type: "bot" | "explanation" | "fullpack" | "none";
}