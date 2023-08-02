import { makeInvestorService } from '@src/factories/makeInvestorService';
import { logger } from '@src/shared/utils/logger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const createInvestorController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const investorBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	});

	const { email, password } = investorBodySchema.parse(request.body);

	const createInvestorService = makeInvestorService();

	const { investor } = await createInvestorService.execute({ email, password });
	logger.info({
		message: `Investor ${email} created`,
	});
	return reply.status(201).send(JSON.stringify(investor));
};
