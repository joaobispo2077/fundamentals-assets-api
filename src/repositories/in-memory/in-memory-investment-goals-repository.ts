import {
	CreateInvestmentsGoalsInput,
	InvestmentsGoal,
	InvestmentsGoalsRepository,
} from '../interfaces/investments-goals-repository';
import crypto from 'node:crypto';

export class InMemoryInvestmentGoalsRepository
	implements InvestmentsGoalsRepository
{
	private investmentsGoals: InvestmentsGoal[] = [];

	async create(data: CreateInvestmentsGoalsInput): Promise<InvestmentsGoal> {
		const newInvestmentsGoal = {
			...data,
			id: crypto.randomUUID(),
		};
		this.investmentsGoals.push(newInvestmentsGoal);
		return newInvestmentsGoal;
	}

	async findInvestmentsGoalsById(id: string): Promise<InvestmentsGoal | null> {
		const investmentGoal = this.investmentsGoals.find((goal) => goal.id === id);
		return investmentGoal ?? null;
	}

	async update(
		walletId: string,
		data: Omit<InvestmentsGoal, 'id'>,
	): Promise<InvestmentsGoal | null> {
		const index = this.investmentsGoals.findIndex(
			(goal) => goal.walletId === walletId,
		);

		if (index === -1) {
			return null;
		}

		const updatedInvestmentsGoal = {
			...this.investmentsGoals[index],
			...data,
		};

		this.investmentsGoals[index] = updatedInvestmentsGoal;
		return updatedInvestmentsGoal;
	}
}
