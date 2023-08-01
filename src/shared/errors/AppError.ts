export class AppError extends Error {
	public readonly code: number = 500;

	constructor(message: string) {
		super(`Internal error: ${message}`);
		this.name = 'AlreadyExistsError';
	}
}
