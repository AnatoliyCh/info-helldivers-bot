import { webhookHandler } from 'gramio';
import useTelegramBot from './bot/use-telegram-bot';
import useConfig from './features/use-config';

const signals = ['SIGINT', 'SIGTERM'] as const;

const config = useConfig();
const bot = await useTelegramBot(config);
const server = config.hostUrl
    ? Bun.serve({
          port: 88,
          routes: { '/ihb': { GET: () => new Response('Bun! 88'), POST: webhookHandler(bot, 'Bun.serve') } },
      })
    : null;

server && console.log(`listening on ${server.url} | webhook: ${config.hostUrl}`);

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
