import { type Bot } from 'gramio';
import useManualTips from '../../features/manual-tips/use-manual-tips';

export default async (bot: Bot) => {
    const manualTips = useManualTips();
    bot.onStart(() => console.log('add command "tips"')).command('tips', async (ctx) => {
        await ctx.send(manualTips.getRandomTipsAsQuote());
        ctx.delete();
    });
};
