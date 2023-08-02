import { authenticateInvestorController } from '@src/controllers/investors/AuthenticateInvestorController';
import { createInvestorController } from '@src/controllers/investors/CreateInvestorController';
import { FastifyInstance } from 'fastify';

export async function setupInvestorRoutes(app: FastifyInstance) {
	app.post(
		'/investors',
		{
			schema: {
				tags: ['Users'],
				description: 'Register an investor',
				body: {
					type: 'object',
					required: ['email', 'password'],
					properties: {
						email: { type: 'string', format: 'email' },
						password: { type: 'string' },
					},
				},
				response: {
					201: {
						type: 'object',
						properties: {},
					},
				},
			},
		},
		createInvestorController,
	);

	app.post(
		'/tokens',
		{
			schema: {
				tags: ['Users'],
				description: 'Authenticate an investor generating an access token',
				body: {
					type: 'object',
					required: ['email', 'password'],
					properties: {
						email: { type: 'string', format: 'email' },
						password: { type: 'string' },
					},
				},
				response: {
					200: {
						type: 'object',
						properties: {
							token: { type: 'string' },
						},
					},
				},
			},
		},
		authenticateInvestorController,
	);
}
