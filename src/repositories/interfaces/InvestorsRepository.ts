export type Investor = {
	id: string;
	email: string;
	password_hash: string;
};

export type CreateInvestorInput = Omit<Investor, 'id'>;

export interface InvestorsRepository {
	create(data: CreateInvestorInput): Promise<Investor>;
	findByEmail(email: string): Promise<Investor | null>;
}
