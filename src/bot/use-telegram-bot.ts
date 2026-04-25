import { Bot, Composer, MediaUpload } from 'gramio';
import useRandomTips from '../features/random-tips/use-random-tips';
import useScreenshot from '../features/use-screenshot';
import type { BotState, Config } from '../types';

const isCooldown = (lastRequest: number, requestCooldown: number) => Date.now() - lastRequest <= requestCooldown;

export default async (config: Config) => {
    const state: BotState = { lastRequest: 0 };

    const tips = useRandomTips();
    const withState = new Composer({ name: 'state' })
        .decorate({ state })
        .guard((ctx) => !isCooldown(ctx.state.lastRequest, config.requestCooldown))
        .as('scoped');

    const bot = new Bot(config.botToken).onStart(() => console.log('bot started')).extend(withState);

    const addTips = async () => {
        const composer = new Composer({ name: 'tips' }).extend(withState).command('tips', async (ctx) => {
            ctx.state.lastRequest = Date.now();
            await ctx.send(tips.getTipsAsQuote());
            ctx.delete();
        });

        bot.extend(composer);
        console.log('added command "tips"');
    };

    const addMainOrder = async () => {
        const screenshot = await useScreenshot(config);
        const composer = new Composer({ name: 'main_order' }).extend(withState).command('main_order', async (ctx) => {
            ctx.state.lastRequest = Date.now();
            await ctx.sendMedia({
                type: 'photo',
                photo: MediaUpload.buffer(await screenshot.get()),
                caption: tips.getTipsAsQuote(),
            });
            ctx.delete();
        });

        bot.extend(composer).onStop(async () => await screenshot.close());
        console.log('added command "main_order"');
    };

    await addTips();
    await addMainOrder();

    return bot;
};
