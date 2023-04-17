import * as path from 'path';
import dotenv from 'dotenv-safe';
import { TYPE_CONFIG } from '../models/config';
import LoggerManager, { LOGGER_VALUES } from './logger.manager';
import Config from '../configurations/config.type';
import config from '../configurations/config'

export default class ConfigManager {

    static currentConfig: any;
    static configFromDB: any;
    static currentEnvironment: any;

    static async loadConfig(): Promise<any> {
        try {
            dotenv.config()
            const { correct, errorMessage } = this.checkConfig(config);
            if(!correct) {
                throw errorMessage;
            }
            ConfigManager.currentConfig = config;
        } catch (error) {
            console.log("ERROR AL CARGAR LA CONFIGURACION", error)
            throw String(error);
        }
    }

    static getConfiguration(module?: string): any {
        return module ? this.currentConfig[module] : this.currentConfig;
    }

    static getConfigurationFromDB(): TYPE_CONFIG {
        return this.configFromDB;
    }

    static checkConfig(config: Config): { correct: boolean, errorMessage?: string } {
        return {
            correct: true
        };
    }

    static logConfig() {
        LoggerManager.info('CONFIG app', {
            logValue: LOGGER_VALUES.CONFIG,
            environment: this.currentEnvironment,
            config: ConfigManager.currentConfig
        });
    }

}
