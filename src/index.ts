import useTelegramBot from './bot/use-telegram-bot';
import useConfig from './features/use-config';

const signals = ['SIGINT', 'SIGTERM'] as const;

const config = useConfig();
const bot = await useTelegramBot(config);
bot.start();

for (const signal of signals) {
    process.on(signal, async () => {
        console.log(`${signal} => exiting...`);
        await bot.stop();
        process.exit(0);
    });
}
