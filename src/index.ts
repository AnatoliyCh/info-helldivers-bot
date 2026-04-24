import useTelegramBot from './bot/use-telegram-bot';
import useConfig from './features/use-config';

const config = useConfig();
useTelegramBot(config);
