import { compare } from 'bcryptjs';
import { CreateInvestorService } from '@src/services/investors/createInvestorService';
import { InMemoryInvestorsRepository } from '@src/repositories/in-memory/InMemoryInvestorsRepository';
import { AlreadyExistsError } from '@src/shared/errors/AlreadyExistsError';

let investorsRepository: InMemoryInvestorsRepository;
let createInvestorService: CreateInvestorService;

describe('CreateInvestorService', () => {
	beforeEach(() => {
		investorsRepository = new InMemoryInvestorsRepository();
		createInvestorService = new CreateInvestorService(investorsRepository);
	});

	it('should hash investor password upon registration', async () => {
		const { investor } = await createInvestorService.execute({
			email: 'john.doe@gmail.com',
			password: '123456',
		});

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			investor.password_hash,
		);

		expect(isPasswordCorrectlyHashed).toBeTruthy();
	});

	it('shoud not be able to register with same email', async () => {
		const email = 'john.doe@gmail.com';

		await createInvestorService.execute({
			email,
			password: '123456',
		});

		await expect(
			createInvestorService.execute({
				email,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AlreadyExistsError);
	});

	it('shoud be able to register', async () => {
		const email = 'john.doe@gmail.com';

		const { investor } = await createInvestorService.execute({
			email,
			password: '123456',
		});

		expect(investor.id).toEqual(expect.any(String));
	});
});
