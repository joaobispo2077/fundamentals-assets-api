import { AppError } from './AppError';

export class InvalidAllocationInvestmentGoalsError extends AppError {
	public readonly code: number = 400;

	constructor(message: string = '') {
		super(message);
		this.name = 'InvalidAllocationInvestmentGoalsError';
	}
}
