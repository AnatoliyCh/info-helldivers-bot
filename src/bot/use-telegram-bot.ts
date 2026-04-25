import { Bot } from 'gramio';
import type { Config } from '../features/use-config';
import addMainOrder from './commands/add-main-order';
import addTips from './commands/add-tips';

export default async (config: Config) => {
    const bot = new Bot(config.botToken).onStart(() => console.log('bot started'));

    await addTips(bot);
    await addMainOrder(bot, config);

    return bot;
};
