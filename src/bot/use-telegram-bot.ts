import { Bot } from 'gramio';
import type { Config } from '../features/use-config';
import addMainOrder from './commands/add-main-order';

export default (config: Config) => {
    const bot = new Bot(config.botToken).onStart(() => console.log('bot started'));
    addMainOrder(config, bot);

    bot.start();
    return bot;
};
