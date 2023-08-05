export type Wallet = {
	id: string;
	title: string;
};

export type CreateWalletInput = Omit<Wallet, 'id'>;

export interface WalletsRepository {
	create(data: CreateWalletInput): Promise<Wallet>;
}
