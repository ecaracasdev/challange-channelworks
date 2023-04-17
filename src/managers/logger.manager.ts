import Bunyan from "bunyan";
import ConfigManager from './config.manager';

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

const getLevel = (level: LogLevel): LogLevel => {
    if (['trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(level)) {
      return level;
    } else {
      return 'info';
    }
  };

interface MyObj {
  name: string;
}

const _getErrorValue = (value: MyObj | any): any => {
  let val;
  if (value?.valueOf && typeof value.valueOf === 'function') {
    val = value.valueOf();
  } else {
    val = value;
  }
  return val;
};

const handleLoggerConsole = (value: any, obj: object) => {
  console.log(value, obj);
};

const LoggerManager = {
  // Levels
  // "fatal" (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
  // "error" (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
  // "warn" (40): A note on something that should probably be looked at by an operator eventually.
  // "info" (30): Detail on regular operation.
  // "debug" (20): Anything else, i.e. too verbose to be included in "info" level.
  // "trace" (10): Logging from external libraries used by your app or very detailed application logging.

  logger: null as any,
  enabled: false,
  // static currentConfig: any;
  async init() {
    const config = ConfigManager.getConfiguration();
    LoggerManager.enabled = true;
    const hasConsoleLog =
      String(process.env.DEBUG_CONSOLE).trim().toLowerCase() === 'console';
    if (hasConsoleLog) {
      LoggerManager.logger = {
        trace: handleLoggerConsole,
        debug: handleLoggerConsole,
        info: handleLoggerConsole,
        warn: handleLoggerConsole,
        error: handleLoggerConsole,
        fatal: handleLoggerConsole,
      };
    } else {
      LoggerManager.logger = new Bunyan({
        name: 'chanel-works-logger',
        streams: [
          {
            stream: process.stdout,
            level: getLevel('info'),
          },
        ],
      });
    }
  },

  // level 10
  trace(value: any, obj: object = {}) {
    if (LoggerManager.enabled && LoggerManager.logger !== null) {
      LoggerManager.logger.trace(obj, value);
    }
  },

  // level 20
  debug(value: any, obj: object = {}) {
    if (LoggerManager.enabled) {
      LoggerManager.logger.debug(obj, value);
    }
  },

  // level 30
  info(value: any, obj: object = {}) {
    if (LoggerManager.enabled) {
      LoggerManager.logger.info(obj, value);
    }
  },

  // level 40
  warn(value: any, obj: object = {}) {
    if (LoggerManager.enabled) {
      LoggerManager.logger.warn(obj, value);
    }
  },

  // level 50
  error(value: any, obj: object = {}) {
    if (LoggerManager.enabled) {
      const val = _getErrorValue(value);
      LoggerManager.logger.error(obj, val);
    }
  },

  // level 60
  fatal(value: any, obj: object = {}) {
    if (LoggerManager.enabled) {
      const val = _getErrorValue(value);
      LoggerManager.logger.fatal(obj, val);
    }
  },

  handleError(error: any) {
    let value;
    if (error.stack) {
      value = error.stack;
    } else {
      if (typeof error === 'object') {
        value = JSON.stringify(error);
      } else {
        value = String(error);
      }
    }
    return value;
  },
};

export default LoggerManager;

export enum LOGGER_VALUES {
  MY_VALUE_1 = 'MY_VALUE_1',
  ERROR_500 = 'ERROR_500',
  AUTH_401 = 'AUTH_401',
  AUTH_403 = 'AUTH_403',
  CONFIG = 'CONFIG',
}
