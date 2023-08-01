import {
	CreateInvestorInput,
	Investor,
	InvestorsRepository,
} from '../interfaces/InvestorsRepository';
import crypto from 'node:crypto';

export class InMemoryInvestorsRepository implements InvestorsRepository {
	private investors: Investor[] = [];

	async create(data: CreateInvestorInput): Promise<Investor> {
		const newInvestor = {
			id: crypto.randomUUID(),
			...data,
		};
		this.investors.push(newInvestor);
		return newInvestor;
	}

	async findByEmail(email: string): Promise<Investor | null> {
		const investor = this.investors.find(
			(investor) => investor.email === email,
		);
		return investor || null;
	}
}
