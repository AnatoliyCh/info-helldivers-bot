import { MediaUpload, type Bot } from 'gramio';
import useRandomTips from '../../features/random-tips/use-random-tips';
import useScreenshot from '../../features/use-screenshot';

export default async (config: any, bot: Bot) => {
    const screenshot = await useScreenshot(config);
    const tips = useRandomTips();
    bot.onStart(() => console.log('add command "main_order"'))
        .onStop(async () => await screenshot.close())
        .command('main_order', async (ctx) => {
            await ctx.sendMedia({
                type: 'photo',
                photo: MediaUpload.buffer(await screenshot.get()),
                caption: tips.getTipsAsQuote(),
            });

            ctx.delete();
        });
};
