import { WalletsRepository } from '@src/repositories/interfaces/WalletsRepository';

export type CreateWalletServiceRequest = {
	title: string;
};

export class CreateWalletService {
	constructor(private readonly walletsRepository: WalletsRepository) {}

	async execute({ title }: CreateWalletServiceRequest) {
		const newWallet = await this.walletsRepository.create({
			title,
		});

		return { wallet: newWallet };
	}
}
