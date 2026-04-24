import { MediaUpload, type Bot } from 'gramio';
import useManualTips from '../../features/manual-tips/use-manual-tips';
import useScreenshot from '../../features/use-screenshot';

export default async (config: any, bot: Bot) => {
    const screenshot = await useScreenshot(config);
    const manualTips = useManualTips();
    bot.onStart(() => console.log('add command "main_order"'))
        .onStop(async () => await screenshot.close())
        .command('main_order', async (ctx) => {
            await ctx.sendMedia({
                type: 'photo',
                photo: MediaUpload.buffer(await screenshot.get()),
                caption: manualTips.getRandomTipsAsQuote(),
            });

            ctx.delete();
        });
};
