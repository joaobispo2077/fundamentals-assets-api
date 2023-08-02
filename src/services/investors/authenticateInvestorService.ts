import { InvestorsRepository } from '@src/repositories/interfaces/InvestorsRepository';
import { InvalidCredentialsAuthenticationError } from '@src/shared/errors/InvalidCredentialError';
import { compare } from 'bcryptjs';

export type CreateInvestorServiceRequest = {
	email: string;
	password: string;
};

export class AuthenticateInvestorService {
	constructor(private readonly investorsRepository: InvestorsRepository) {}

	async execute({ email, password }: CreateInvestorServiceRequest) {
		console.error(email);
		const investor = await this.investorsRepository.findByEmail(email);

		if (!investor) {
			console.error(investor);
			console.error('here');
			console.error('here');
			throw new InvalidCredentialsAuthenticationError();
		}

		const doesPasswordMatches = await compare(password, investor.password_hash);

		if (!doesPasswordMatches) {
			console.error('hiro');
			throw new InvalidCredentialsAuthenticationError();
		}

		return { investor };
	}
}
