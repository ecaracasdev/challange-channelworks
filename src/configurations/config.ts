import ConfigType from './config.type';

const Config: ConfigType = {
    enviroment: 'development',
    mongoAtlasUri: 'mongodb+srv://egg:Egg2020@cluster0-sssyp.mongodb.net/test?retryWrites=true&w=majority',
    server: {
        name: 'Node js server',
        port: 8080
    },
    jwt: {
        expirationTime: '24h',
        secretJwt: 'secretJwt'
    }
};

export default Config;
