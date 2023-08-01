import { createInvestorController } from '@src/controllers/investors/CreateInvestorController';
import { FastifyInstance } from 'fastify';

export async function setupInvestorRoutes(app: FastifyInstance) {
	app.post(
		'/investors',
		{
			schema: {
				tags: ['Users'],
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
}
