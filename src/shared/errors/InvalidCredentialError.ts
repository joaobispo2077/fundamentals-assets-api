import { NotAuthorizedError } from './NotAuthorizedError';

export class InvalidCredentialsAuthenticationError extends NotAuthorizedError {
	constructor() {
		super(`Invalid Credentials`);
		this.name = 'InvalidCredentialsAuthenticationError';
	}
}
