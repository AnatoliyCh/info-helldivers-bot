import { blockquote, format } from 'gramio';
import data from './manual-tips.json';

export default () => {
    const getRandom = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)] ?? '';

    return {
        getRandomTips: () => getRandom(data), // рандомная строка
        getRandomTipsAsQuote: () => format`${blockquote`${getRandom(data)}`}`, // рандомная строка в виде цитаты
    };
};
