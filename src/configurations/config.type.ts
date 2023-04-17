type Config = {
    enviroment: string,
    mongoAtlasUri: string,
    server: {
        name: string,
        port: number
    },
    jwt: {
        expirationTime: string,
        secretJwt: string,
    },
    logger?: {
        level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'
    },

};

export default Config;
