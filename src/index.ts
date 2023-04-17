import DBManager from './managers/db.manager';
import ServerManager from './managers/server.manager';
import ConfigManager from './managers/config.manager';
import LoggerManager from './managers/logger.manager';


async function init() {
    try {
        await ConfigManager.loadConfig();
        await DBManager.connect();
        await ServerManager.start();
        await LoggerManager.init();
        ConfigManager.logConfig();
        
    } catch (error) {
        LoggerManager.fatal('ERROR ON LOAD APP', { error: LoggerManager.handleError(error) });
    }
}

init();
