export type InvestmentsGoal = {
	id: string;
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
	maximum_asset_allocation: number;
};

export type CreateInvestmentsGoalsInput = Omit<InvestmentsGoal, 'id'>;

export interface InvestmentsGoalsRepository {
	create(data: CreateInvestmentsGoalsInput): Promise<InvestmentsGoal>;
	findInvestmentsGoalsById(id: string): Promise<InvestmentsGoal | null>;
	update(
		walletId: string,
		data: Omit<InvestmentsGoal, 'id'>,
	): Promise<InvestmentsGoal | null>;
}
