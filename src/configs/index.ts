import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
	SWAGGER_HOST: z.string().default('localhost:3333'),
	SALT_ROUND: z.coerce.number().default(12),
	PORT: z.coerce.number().default(3333),
	NODE_ENV: z
		.enum(['development', 'test', 'production'])
		.default('development'),
});

const _configs = configSchema.safeParse(process.env);

if (!_configs.success) {
	console.error(`Invalid environment variables`, _configs.error.format());
	throw new Error(`Invalid environment variables`);
}

export const configs = {
	..._configs.data,
};