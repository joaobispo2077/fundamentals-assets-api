import { configs } from '@src/configs';
import { makeAuthenticateInvestorService } from '@src/factories/makeAuthenticateInvestorService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const authenticateInvestorController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const authenticateInvestorBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	});

	const { email, password } = authenticateInvestorBodySchema.parse(
		request.body,
	);

	const authenticateInvestorService = makeAuthenticateInvestorService();

	const { investor } = await authenticateInvestorService.execute({
		email,
		password,
	});

	const token = await reply.jwtSign(
		{},
		{
			sign: {
				sub: investor.id,
			},
		},
	);

	const refreshToken = await reply.jwtSign(
		{},
		{
			sign: {
				sub: investor.id,
			},
		},
	);

	return reply
		.setCookie(configs.COOKIE_REFRESH_TOKEN_NAME, refreshToken, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.status(200)
		.send({
			token,
		});
};
