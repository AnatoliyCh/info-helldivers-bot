import { Bot, Composer, MediaUpload } from 'gramio';
import useRandomTips from '../features/random-tips/use-random-tips';
import config from '../features/use-config';
import logger from '../features/use-logger';
import useScreenshot from '../features/use-screenshot';
import type { BotState } from '../types';
import { constants, isCooldown } from './helpers';

export default async () => {
    const { commands } = constants;
    const tips = useRandomTips();

    const state: BotState = { lastRequest: 0 };
    const withState = new Composer({ name: 'state' })
        .decorate({ state })
        .guard((ctx) => !config.requestCooldown || !isCooldown(ctx.state.lastRequest, config.requestCooldown))
        .as('scoped');

    const bot = new Bot(config.botToken).onStart(() => logger.log('bot started')).extend(withState);

    const addTips = async () => {
        const composer = new Composer({ name: commands.tips }).extend(withState).command(commands.tips, async (ctx) => {
            ctx.state.lastRequest = Date.now();
            await ctx.send(tips.getTipsAsQuote());
            ctx.delete();
        });

        bot.extend(composer);
        logger.addedCommand(commands.tips);
    };

    const addMainOrder = async () => {
        const screenshot = await useScreenshot(config);
        const composer = new Composer({ name: commands.mainOrder })
            .extend(withState)
            .command(commands.mainOrder, async (ctx) => {
                ctx.state.lastRequest = Date.now();
                const pendingMessage = await ctx.send('обрабатываю данные...').catch(() => null);
                await ctx.sendMedia({
                    type: 'photo',
                    photo: MediaUpload.buffer(await screenshot.get()),
                    caption: tips.getTipsAsQuote(),
                });
                await Promise.all([pendingMessage?.delete().catch(() => null), ctx.delete().catch(() => null)]);
            });

        bot.extend(composer).onStop(async () => await screenshot.close());
        logger.addedCommand(commands.mainOrder);
    };

    await addTips();
    await addMainOrder();

    return bot;
};
