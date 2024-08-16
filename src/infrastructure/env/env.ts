const isDevelopment = import.meta.env.DEV;

export const Env = {
    isDevelopment,
    isLive: !isDevelopment,
    name: isDevelopment ? 'Dev' : 'LIVE'
};
