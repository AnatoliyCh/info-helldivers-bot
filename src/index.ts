import { webhookHandler } from 'gramio';
import useTelegramBot from './bot/use-telegram-bot';
import config from './features/use-config';
import logger from './features/use-logger';

const signals = ['SIGINT', 'SIGTERM'] as const;

const bot = await useTelegramBot();
const server = config.hostUrl
    ? Bun.serve({
          port: 88,
          routes: { '/ihb': { GET: () => new Response('Bun! 88'), POST: webhookHandler(bot, 'Bun.serve') } },
      })
    : null;

server && logger.log(`listening on ${server.url} | webhook: ${config.hostUrl}`);

bot.start({
    dropPendingUpdates: true,
    deleteWebhook: 'on-conflict-with-polling',
    webhook: config.hostUrl ? { url: config.hostUrl } : undefined,
});

for (const signal of signals) {
    process.on(signal, async () => {
        logger.log(`${signal} => exiting...`);
        await Promise.all([bot.stop, server?.stop() || Promise.resolve()]);
        process.exit(0);
    });
}
