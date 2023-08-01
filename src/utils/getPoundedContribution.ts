export type Asset = {
	ticker: string;
	grade: number;
};

export const getPoundedContribution = (
	asset: Asset,
	totalContribution: number,
	sumAllStockGrades: number,
) => {
	return (asset.grade * totalContribution) / sumAllStockGrades;
};
