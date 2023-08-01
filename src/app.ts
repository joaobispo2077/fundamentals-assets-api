import fastify from 'fastify';

import { ZodError } from 'zod';
import { configs } from './configs';
import { AppError } from './shared/errors/AppError';
import { checkIsClientStatusError } from './shared/utils/checkIsClientStatusError';

const app = fastify();

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(422)
			.send({ message: 'Validation error', issues: error.format() });
	}

	if (error instanceof AppError && checkIsClientStatusError(error.code)) {
		return reply.status(error.code).send({ message: error.message });
	}

	if (configs.NODE_ENV !== 'production') {
		console.error(error);
	} else {
		// TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({ message: 'Internal server error' });
});

export { app };
