import { InMemoryInvestorsRepository } from './InMemoryInvestorsRepository';

export const singletonInMemoryInvestorsRepository =
	new InMemoryInvestorsRepository();
