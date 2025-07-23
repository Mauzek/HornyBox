export interface InputProps {
    type: string;
    placeholder: string;
    error: string;
    minLength?: number;
    value?: string;
    setValue: (value: string) => void;
}