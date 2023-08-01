import { FastifyInstance } from 'fastify';
import { setupInvestorRoutes } from './investors/investorsRoutes';

export const setupRoutes = async (app: FastifyInstance) => {
	app.register(setupInvestorRoutes);
};
