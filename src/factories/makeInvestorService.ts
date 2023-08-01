import { InMemoryInvestorsRepository } from '@src/repositories/in-memory/InMemoryInvestorsRepository';
import { CreateInvestorService } from '@src/services/investors/createInvestorService';

export const makeInvestorService = () => {
	const inMemoryInvestorRepository = new InMemoryInvestorsRepository();
	const createInvestorService = new CreateInvestorService(
		inMemoryInvestorRepository,
	);

	return createInvestorService;
};
