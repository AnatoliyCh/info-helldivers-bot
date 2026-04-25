import { MediaUpload, type Bot } from 'gramio';
import useRandomTips from '../../features/random-tips/use-random-tips';
import type { Config } from '../../features/use-config';
import useScreenshot from '../../features/use-screenshot';

export default async (bot: Bot, config: Config) => {
    const screenshot = await useScreenshot(config);
    const tips = useRandomTips();
    bot.onStop(async () => await screenshot.close()).command('main_order', async (ctx) => {
        await ctx.sendMedia({
            type: 'photo',
            photo: MediaUpload.buffer(await screenshot.get()),
            caption: tips.getTipsAsQuote(),
        });

        ctx.delete();
    });

    console.log('added command "main_order"');
};
