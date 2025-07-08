import logo from './logo.svg';
import logoSmall from './logo-small.png';
import logoSmallSvg from './logo-small-svg.svg'

export const images = {
    logo,
    logoSmall,
    logoSmallSvg
} as const;

export type ImageName = keyof typeof images;