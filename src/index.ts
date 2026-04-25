import useTelegramBot from './bot/use-telegram-bot';
import useConfig from './features/use-config';

const signals = ['SIGINT', 'SIGTERM'] as const;

const config = useConfig();
const bot = await useTelegramBot(config);
const server = config.hostUrl ? Bun.serve({ port: 3000, routes: { '/ihb': () => new Response('Bun!') } }) : null;

bot.start({
    dropPendingUpdates: true,
    deleteWebhook: 'on-conflict-with-polling',
    webhook: config.hostUrl ? { url: config.hostUrl } : undefined,
});

for (const signal of signals) {
    process.on(signal, async () => {
        console.log(`${signal} => exiting...`);
        await Promise.all([bot.stop, server?.stop() || Promise.resolve()]);
        process.exit(0);
    });
}
