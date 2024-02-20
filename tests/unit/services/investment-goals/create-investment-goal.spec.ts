import { InMemoryInvestmentGoalsRepository } from '@src/repositories/in-memory/in-memory-investment-goals-repository';
import {
	InvestmentsGoal,
	InvestmentsGoalsRepository,
} from '@src/repositories/interfaces/investments-goals-repository';
import { CreateInvestmentsGoalsService } from '@src/services/investment-goals/create-investment-goal';
import { InvalidAllocationInvestmentGoalsError } from '@src/shared/errors/invalid-allocation-of-goals';

describe('CreateInvestmentsGoalsService', () => {
	let investmentsGoalsRepository: InvestmentsGoalsRepository;
	let createInvestmentsGoalsService: CreateInvestmentsGoalsService;

	beforeEach(() => {
		investmentsGoalsRepository = new InMemoryInvestmentGoalsRepository();
		createInvestmentsGoalsService = new CreateInvestmentsGoalsService(
			investmentsGoalsRepository,
		);
	});

	it('should create new investment goals with valid allocation percentages', async () => {
		const walletId = 'wallet-id';
		const max_bond_br = 10;
		const max_bond_us = 20;
		const max_reserve_of_opportunity = 5;
		const max_etf_br = 15;
		const max_etf_us = 10;
		const max_stocks_br = 10;
		const max_stocks_us = 10;
		const max_reits_br = 5;
		const max_reits_us = 5;
		const max_cryptocurrencies = 10;
		const maximum_asset_allocation = 7;

		const createInvestmentsGoalsServiceRequest = {
			walletId,
			max_bond_br,
			max_bond_us,
			max_reserve_of_opportunity,
			max_etf_br,
			max_etf_us,
			max_stocks_br,
			max_stocks_us,
			max_reits_br,
			max_reits_us,
			max_cryptocurrencies,
			maximum_asset_allocation,
		};

		const createSpy = jest
			.spyOn(investmentsGoalsRepository, 'create')
			.mockResolvedValueOnce({} as InvestmentsGoal | Promise<InvestmentsGoal>);

		const result = await createInvestmentsGoalsService.execute(
			createInvestmentsGoalsServiceRequest,
		);

		expect(createSpy).toHaveBeenCalledWith(
			createInvestmentsGoalsServiceRequest,
		);
		expect(result).toEqual({ newInvestmentsGoals: {} });
	});

	it('should throw an error when the sum of allocation percentages is not 100', async () => {
		const walletId = 'wallet-id';
		const max_bond_br = 1;
		const max_bond_us = 20;
		const max_reserve_of_opportunity = 5;
		const max_etf_br = 15;
		const max_etf_us = 10;
		const max_stocks_br = 10;
		const max_stocks_us = 10;
		const max_reits_br = 5;
		const max_reits_us = 5;
		const max_cryptocurrencies = 10;
		const maximum_asset_allocation = 7;

		const createInvestmentsGoalsServiceRequest = {
			walletId,
			max_bond_br,
			max_bond_us,
			max_reserve_of_opportunity,
			max_etf_br,
			max_etf_us,
			max_stocks_br,
			max_stocks_us,
			max_reits_br,
			max_reits_us,
			max_cryptocurrencies,
			maximum_asset_allocation,
		};

		const createSpy = jest.spyOn(investmentsGoalsRepository, 'create');

		await expect(
			createInvestmentsGoalsService.execute(
				createInvestmentsGoalsServiceRequest,
			),
		).rejects.toThrow(InvalidAllocationInvestmentGoalsError);

		expect(createSpy).not.toHaveBeenCalled();
	});
});
