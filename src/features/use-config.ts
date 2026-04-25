import type { Config } from '../types';

export default (): Config => {
    const { REQUEST_URL, REQUEST_COOLDOWN, SELECTOR, BOT_TOKEN, HOST_URL } = process.env;
    const requestUrl = REQUEST_URL?.trim();
    const requestCooldown = parseInt(REQUEST_COOLDOWN || '60000', 10);
    const selector = SELECTOR?.trim();
    const botToken = BOT_TOKEN?.trim();
    const hostUrl = HOST_URL?.trim();

    if (!requestUrl) throw new Error('REQUEST_URL is not defined in .env');
    if (isNaN(requestCooldown)) throw new Error('REQUEST_COOLDOWN must be a valid number in .env');
    if (!selector) throw new Error('SELECTOR is not defined in .env');
    if (!botToken) throw new Error('BOT_TOKEN is not defined in .env');

    return { requestUrl, requestCooldown, selector, botToken, hostUrl };
};
