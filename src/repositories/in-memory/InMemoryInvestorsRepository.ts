import {
	CreateInvestorInput,
	Investor,
	InvestorsRepository,
} from '../interfaces/InvestorsRepository';
import crypto from 'node:crypto';

export class InMemoryInvestorsRepository implements InvestorsRepository {
	private investors: Investor[] = [];

	async create(data: CreateInvestorInput): Promise<Investor> {
		const newInvestor: Investor = {
			id: crypto.randomUUID(),
			email: data.email,
			password_hash: data.password_hash,
		};
		this.investors.push(newInvestor);
		return newInvestor;
	}

	async findByEmail(email: string): Promise<Investor | null> {
		const investor = this.investors.find(
			(investor) => investor.email === email,
		);
		return investor ?? null;
	}
}
