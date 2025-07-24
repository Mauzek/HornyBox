export interface SocialButtonProps {
    text: string;
    icon: React.ReactNode;
    onAction: () => void;
    disabled: boolean;
}