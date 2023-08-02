import { singletonInMemoryInvestorsRepository } from '@src/repositories/in-memory';
import { CreateInvestorService } from '@src/services/investors/createInvestorService';

export const makeInvestorService = () => {
	const createInvestorService = new CreateInvestorService(
		singletonInMemoryInvestorsRepository,
	);

	return createInvestorService;
};
