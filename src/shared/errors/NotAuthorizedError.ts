import { AppError } from './AppError';

export class NotAuthorizedError extends AppError {
	public readonly code: number = 401;

	constructor(message: string = '') {
		super(`Not Authorized: ${message}`);
		this.name = 'NotAuthorizedError';
	}
}
