import logo from './logo.svg';
import logoSmall from './logo-small.png';

export const images = {
    logo,
    logoSmall,
} as const;

export type ImageName = keyof typeof images;