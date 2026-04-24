import useTelegramBot from './bot/use-telegram-bot';
import useConfig from './features/use-config';

const config = useConfig();
const bot = useTelegramBot(config);
