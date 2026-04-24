import { type Bot } from 'gramio';
import useRandomTips from '../../features/random-tips/use-random-tips';

export default async (bot: Bot) => {
    const tips = useRandomTips();
    bot.onStart(() => console.log('add command "tips"')).command('tips', async (ctx) => {
        await ctx.send(tips.getTipsAsQuote());
        ctx.delete();
    });
};
