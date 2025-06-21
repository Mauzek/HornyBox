export interface AccordionProps {
    id: number;
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: (id: number) => void;
}