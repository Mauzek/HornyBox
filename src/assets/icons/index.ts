import articles from './articles-category.svg';
import bot from './bot-category.svg';
import cart from './cart-icon.svg';
import dots from './dots-icon.svg';
import faq from './faq-category.svg';
import game from './game-category.svg';
import home from './home-icon.svg';
import popular from './popular-category.svg';
import sadEmoji from './sad-emoji.svg';
import services from './services-category.svg';
import star from './star.svg';
import steam from './steam-icon.svg';
import tBank from './t-bank.svg';
import telegram from './tg-icon.svg';
import videos from './videos-category.svg';
import vk from './vk-icon.svg';

export const icons = {
    articles,
    bot,
    cart,
    dots,
    faq,
    game,
    home,
    popular,
    sadEmoji,
    services,
    star,
    steam,
    tBank,
    telegram,
    videos,
    vk,
} as const;

export type IconName = keyof typeof icons;