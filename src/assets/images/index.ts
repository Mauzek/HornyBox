import logo from './logo.svg';
import logoSmall from './logo-small.png';
import logoSmallSvg from './logo-small-svg.svg'
import defaultAvatar from './default-avatar.png';

export const images = {
    logo,
    logoSmall,
    logoSmallSvg,
    defaultAvatar
} as const;

export type ImageName = keyof typeof images;