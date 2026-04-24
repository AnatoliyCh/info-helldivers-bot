export type Config = {
    siteUrl: string;
    requestCooldown: number;
    selector: string;
};

export default (): Config => {
    const { SITE_URL, REQUEST_COOLDOWN, SELECTOR } = process.env;
    const siteUrl = SITE_URL?.trim();
    const requestCooldown = parseInt(REQUEST_COOLDOWN || '60000', 10);
    const selector = SELECTOR?.trim();

    if (!siteUrl) throw new Error('SITE_URL is not defined in .env');
    if (isNaN(requestCooldown)) throw new Error('REQUEST_COOLDOWN must be a valid number in .env');
    if (!selector) throw new Error('SELECTOR is not defined in .env');

    return { siteUrl, requestCooldown, selector };
};
