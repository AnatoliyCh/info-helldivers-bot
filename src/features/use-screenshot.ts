import puppeteer from 'puppeteer';
import type { Config } from './use-config';

export default async (config: Config) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });

    const close = async () => await browser.close();
    const get = async () => {
        const page = await browser.newPage();
        await page.setViewport({ width: 1000, height: 2000, deviceScaleFactor: 1 });

        try {
            await page.goto(config.siteUrl, { waitUntil: 'networkidle2' });
            await page.waitForSelector(config.selector, { timeout: 10000, visible: true });
            await new Promise((res) => setTimeout(res, 2000)); // ожидание анимации и т.п.

            const element = await page.$(config.selector);
            if (!element) throw new Error('Element not found');

            const isSingleBlock = await element.evaluate((el) => el.childElementCount === 1);
            const screenshot = await (isSingleBlock ? await element.$(':scope > *') : element)!.screenshot();
            return screenshot;
        } catch (e) {
            console.error('Error taking screenshot:', e);
            throw e;
        } finally {
            await page.close();
        }
    };

    return { close, get };
};
