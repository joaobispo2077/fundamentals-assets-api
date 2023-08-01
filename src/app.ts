import fastify from 'fastify';

import { ZodError } from 'zod';
import { configs } from './configs';
import { AppError } from './shared/errors/AppError';
import { checkIsClientStatusError } from './shared/utils/checkIsClientStatusError';
import fastifySwagger, { SwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import pkg from '../package.json';
import { setupRoutes } from './routes';

const app = fastify();

const swaggerOptions: SwaggerOptions = {
	swagger: {
		info: {
			title: pkg.name,
			description: pkg.description,
			version: pkg.version,
		},
		host: configs.SWAGGER_HOST,
		schemes: ['http', 'https'],
		consumes: ['application/json'],
		produces: ['application/json'],
		tags: [{ name: 'Default', description: 'Default' }],
	},
};

const swaggerUiOptions: FastifySwaggerUiOptions = {
	routePrefix: '/docs',
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);
app.register(setupRoutes);

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
