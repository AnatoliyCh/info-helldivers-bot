type Config = {
    siteUrl: string;
    requestCooldown: number;
};

export default (): Config => {
    const { SITE_URL, REQUEST_COOLDOWN } = process.env;
    const siteUrl = SITE_URL?.trim();
    const requestCooldown = parseInt(REQUEST_COOLDOWN || '60000', 10);

    if (!siteUrl) throw new Error('SITE_URL is not defined in .env');
    if (isNaN(requestCooldown))
        throw new Error('REQUEST_COOLDOWN must be a valid number in .env');

    return { siteUrl, requestCooldown };
};
