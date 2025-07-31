import articles from './articles-category.svg';
import bot from './bot-category.svg';
import bot_popup from './bot-popup.svg';
import cart from './cart-icon.svg';
import dots from './dots-icon.svg';
import faq from './faq-category.svg';
import game from './game-category.svg';
import home from './home-icon.svg';
import popular from './popular-category.svg';
import question_popup from './question-popup.svg';
import sadEmoji from './sad-emoji.svg';
import services from './services-category.svg';
import star from './star.svg';
import steam from './steam-icon.svg';
import steamLogo from './steam-logo.svg';
import tBank from './t-bank.svg';
import telegram from './tg-icon.svg';
import videos from './videos-category.svg';
import vk from './vk-icon.svg';

import Russia from './Russia-flag.svg';
import Indonesia from './Indonesia-flag.svg';
import Malaysia from './Malaysia-flag.svg';
import Kazakhstan from './Kazakhstan-flag.svg';
import Global from './Global-flag.svg';

export const flags = {
    Russia,
    Indonesia,
    Malaysia,
    Kazakhstan,
    Global
}

export const icons = {
    articles,
    bot,
    bot_popup,
    cart,
    dots,
    faq,
    game,
    home,
    popular,
    question_popup,
    sadEmoji,
    services,
    star,
    steam,
    steamLogo,
    tBank,
    telegram,
    videos,
    vk,
} as const;

export type IconName = keyof typeof icons;
export type FlagName = keyof typeof flags;