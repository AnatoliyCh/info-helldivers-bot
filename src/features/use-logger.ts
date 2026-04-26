const formatMessage = (level: 'log' | 'command' | 'error', message: string) =>
    `${new Date().toISOString()} [${level}] ${message}`;

const logger = {
    log: (message: string) => console.log(formatMessage('log', message)),
    addedCommand: (commandName: string, message = 'added') =>
        console.log(formatMessage('command', `${message} — ${commandName}`)),
    error: (message: string, error?: unknown) => {
        console.error(formatMessage('error', message));
        if (error) console.error(error);
    },
};

export default logger;
