const constants = {
    commands: {
        tips: 'tips',
        mainOrder: 'main_order',
    },
} as const;

const isCooldown = (lastRequest: number, requestCooldown: number) => Date.now() - lastRequest <= requestCooldown;

export { constants, isCooldown };
