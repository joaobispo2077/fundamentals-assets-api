import { app } from './app';
import { configs } from './configs';
import { logger } from './shared/utils/logger';

app
	.listen({
		host: '0.0.0.0',
		port: configs.PORT,
	})
	.then((address) => {
		logger.info({
			message: `Server listening on ${address}`,
		});
	});
