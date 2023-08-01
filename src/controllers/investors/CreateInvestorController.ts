import { makeInvestorService } from '@src/factories/makeInvestorService';
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

	const newInvestor = await createInvestorService.execute({ email, password });

	return reply.status(201).send(newInvestor);
};
