import {
	Asset,
	getPoundedContribution,
} from '@src/utils/getPoundedContribution';

describe('getContribution', () => {
	it('should be able to calculate contribution per asset using 3 assets for SCHH', () => {
		const assets: Asset[] = [
			{
				ticker: 'IJR',
				grade: 1,
			},
			{
				ticker: 'SCHH',
				grade: 8,
			},
			{
				ticker: 'VNQI',
				grade: 1,
			},
		];

		const totalContribution = 100;
		const sumAllStockGrades = assets.reduce(
			(acc, asset) => acc + asset.grade,
			0,
		);

		const contributionForSchh = getPoundedContribution(
			assets[1],
			totalContribution,
			sumAllStockGrades,
		);

		expect(contributionForSchh).toBe(80);
	});
	it('should be able to calculate contribution per asset using 2 assets', () => {
		const assets: Asset[] = [
			{
				ticker: 'IJR',
				grade: 5,
			},
			{
				ticker: 'VNQI',
				grade: 5,
			},
		];

		const totalContribution = 100;
		const sumAllStockGrades = assets.reduce(
			(acc, asset) => acc + asset.grade,
			0,
		);

		const contributionForIjr = getPoundedContribution(
			assets[0],
			totalContribution,
			sumAllStockGrades,
		);

		const contributionForVnqi = getPoundedContribution(
			assets[0],
			totalContribution,
			sumAllStockGrades,
		);

		expect(contributionForIjr).toBe(50);
		expect(contributionForVnqi).toBe(50);
	});
});
