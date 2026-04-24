import { Bot } from 'gramio';
import type { Config } from '../features/use-config';
import addMainOrder from './commands/add-main-order';
import addTips from './commands/add-tips';

export default (config: Config) => {
    const bot = new Bot(config.botToken).onStart(() => console.log('bot started'));

    addTips(bot);
    addMainOrder(config, bot);

    bot.start();
    return bot;
};
