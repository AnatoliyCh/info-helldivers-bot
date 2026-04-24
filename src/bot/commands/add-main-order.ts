import { MediaUpload, type Bot } from 'gramio';
import useScreenshot from '../../features/use-screenshot';

export default async (config: any, bot: Bot) => {
    const screenshot = await useScreenshot(config);
    bot.onStart(() => console.log('add command "main_order"'))
        .onStop(async () => await screenshot.close())
        .command('main_order', async (ctx) => {
            await ctx.sendMedia({
                type: 'photo',
                photo: MediaUpload.buffer(await screenshot.get()),
                caption: 'TODO',
            });

            ctx.delete();
        });
};
