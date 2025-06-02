import acticles from './articles-category.svg';
import bot from './bot-category.svg';
import faq from './faq-category.svg';
import game from './game-category.svg';
import popular from './popular-category.svg';
import services from './services-category.svg';
import steam from './steam-icon.svg';
import telegram from './tg-icon.svg';
import vk from './vk-icon.svg';

export const icons = {
    acticles,
    bot,
    faq,
    game,
    popular,
    services,
    steam,
    telegram,
    vk,
} as const;

export type IconName = keyof typeof icons;