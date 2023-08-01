import { configs } from '@src/configs';
import { InvestorsRepository } from '@src/repositories/interfaces/InvestorsRepository';
import { AlreadyExistsError } from '@src/shared/errors/AlreadyExistsError';
import { hash } from 'bcryptjs';

export type CreateInvestorServiceRequest = {
	email: string;
	password: string;
};

const { SALT_ROUND } = configs;

export class CreateInvestorService {
	constructor(private readonly investorsRepository: InvestorsRepository) {}

	async execute({ email, password }: CreateInvestorServiceRequest) {
		const isInvestorAlreadyExists = await this.investorsRepository.findByEmail(
			email,
		);

		if (isInvestorAlreadyExists) {
			throw new AlreadyExistsError(`Investor ${email}`);
		}

		const passwordHash = await hash(password, SALT_ROUND);
		const newInvestor = await this.investorsRepository.create({
			email,
			password_hash: passwordHash,
		});

		return { investor: newInvestor };
	}
}
