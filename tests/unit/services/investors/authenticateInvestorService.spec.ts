import { hash } from 'bcryptjs';
import { configs } from '@src/configs';
import { InMemoryInvestorsRepository } from '@src/repositories/in-memory/InMemoryInvestorsRepository';
import { AuthenticateInvestorService } from '@src/services/investors/authenticateInvestorService';
import { InvalidCredentialsAuthenticationError } from '@src/shared/errors/InvalidCredentialError';

let investorRepository: InMemoryInvestorsRepository;
let authenticateInvestorService: AuthenticateInvestorService;

describe('AuthenticateInvestorService', () => {
	beforeEach(() => {
		investorRepository = new InMemoryInvestorsRepository();
		authenticateInvestorService = new AuthenticateInvestorService(
			investorRepository,
		);
	});

	it('should be able to authenticate', async () => {
		const email = 'john.doe@gmail.com';
		const password = '123456';

		await investorRepository.create({
			email,
			password_hash: await hash(password, configs.SALT_ROUND),
		});

		const { investor } = await authenticateInvestorService.execute({
			email,
			password,
		});

		expect(investor.id).toEqual(expect.any(String));
	});

	it('should not be able to authenticate with wrong email', async () => {
		const email = 'john.doe@gmail.com';
		const password = '123456';

		await investorRepository.create({
			email,
			password_hash: await hash(password, configs.SALT_ROUND),
		});

		await expect(
			authenticateInvestorService.execute({
				email: 'wrong-email',
				password,
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsAuthenticationError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		const email = 'john.doe@gmail.com';
		const password = '123456';

		await investorRepository.create({
			email,
			password_hash: await hash(password, configs.SALT_ROUND),
		});

		await expect(
			authenticateInvestorService.execute({
				email,
				password: 'abcdefgh',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsAuthenticationError);
	});
});
