import { AppError } from './AppError';

export class AlreadyExistsError extends AppError {
	public readonly code: number = 409;

	constructor(message: string) {
		super(`Already exists: ${message}`);
		this.name = 'AlreadyExistsError';
	}
}
