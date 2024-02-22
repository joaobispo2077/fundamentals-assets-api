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

// REFACTOR code below to accept message or LogData<T>

const handleLogMessage = <T>(
	log: LogData<T> | string,
	level: typeof configs.LOG_LEVEL,
) => {
	if (log instanceof String) {
		return parseLoggerInputToPinoFormat({
			type: level,
			message: log as string,
		});
	}

	return parseLoggerInputToPinoFormat({
		type: level,
		...(log as LogData<T>),
	});
};

const logger: Logger = {
	debug: <T>(log: LogData<T> | string) =>
		pinoLogger.debug(handleLogMessage(log, 'debug')),
	info: <T>(log: LogData<T> | string) =>
		pinoLogger.info(handleLogMessage(log, 'info')),
	warn: <T>(log: LogData<T> | string) =>
		pinoLogger.warn(handleLogMessage(log, 'warn')),
	error: <T>(log: LogData<T> | string) =>
		pinoLogger.error(handleLogMessage(log, 'error')),
};

export { logger };
