import { singletonInMemoryInvestorsRepository } from '@src/repositories/in-memory';
import { AuthenticateInvestorService } from '@src/services/investors/authenticateInvestorService';

export const makeAuthenticateInvestorService = () => {
	const authenticateInvestorService = new AuthenticateInvestorService(
		singletonInMemoryInvestorsRepository,
	);

	return authenticateInvestorService;
};
