export interface FAQProps {
  items: FAQItemProps[];
}

interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
}
