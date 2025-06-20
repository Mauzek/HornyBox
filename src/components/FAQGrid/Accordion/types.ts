export interface AccordionProps {
    id: string;
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: (id: string) => void;
}