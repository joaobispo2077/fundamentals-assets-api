import pino from 'pino';
import { configs } from '@src/configs';
import { LogData, Logger } from '../ports/logger';

const transport = configs.isProduction
	? undefined
	: {
			target: 'pino-pretty',
			options: {
				colorize: true,
			},
	  };

const pinoLogger = pino({
	level: configs.LOG_LEVEL,
	transport,
});

const parseLoggerInputToPinoFormat = <T>({
	message,
	error,
	...data
}: LogData<T>) => ({
	...data,
	msg: message,
	err: error,
});

const logger: Logger = {
	debug: <T>(log: LogData<T>) =>
		pinoLogger.debug(
			parseLoggerInputToPinoFormat({
				type: 'debug',
				...log,
			}),
		),
	info: <T>(log: LogData<T>) =>
		pinoLogger.info(
			parseLoggerInputToPinoFormat({
				type: 'info',
				...log,
			}),
		),
	warn: <T>(log: LogData<T>) =>
		pinoLogger.warn(
			parseLoggerInputToPinoFormat({
				type: 'warn',
				...log,
			}),
		),
	error: <T>(log: LogData<T>) =>
		pinoLogger.error(
			parseLoggerInputToPinoFormat({
				type: 'error',
				...log,
			}),
		),
};

export { logger };
