import { InvalidAllocationInvestmentGoalsError } from '@src/shared/errors/invalid-allocation-of-goals';
import { InvestmentsGoalsRepository } from '@src/repositories/interfaces/investments-goals-repository';
import { logger } from '@src/shared/utils/logger';

export type CreateInvestmentsGoalsServiceRequest = {
	walletId: string;
	max_bond_br: number;
	max_bond_us: number;
	max_reserve_of_opportunity: number;
	max_etf_br: number;
	max_etf_us: number;
	max_stocks_br: number;
	max_stocks_us: number;
	max_reits_br: number;
	max_reits_us: number;
	max_cryptocurrencies: number;
	maximum_asset_allocation?: number;
};

export class CreateInvestmentsGoalsService {
	constructor(
		private readonly investmentsGoalsRepository: InvestmentsGoalsRepository,
	) {}

	async execute({
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
		maximum_asset_allocation = 7,
	}: CreateInvestmentsGoalsServiceRequest) {
		const totalPercentageOfGoals = [
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
		].reduce((previousValue, current) => previousValue + current, 0);

		logger.debug(`totalPercentageOfGoals: ${totalPercentageOfGoals}`);
		if (totalPercentageOfGoals !== 100) {
			throw new InvalidAllocationInvestmentGoalsError(
				`The sum of the percentages must be 100 and not ${totalPercentageOfGoals}`,
			);
		}

		const newInvestmentsGoals = await this.investmentsGoalsRepository.create({
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
		});

		return { newInvestmentsGoals };
	}
}
