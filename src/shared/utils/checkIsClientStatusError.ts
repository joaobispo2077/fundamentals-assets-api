export const checkIsClientStatusError = (code: number) => {
	return code >= 400 && code < 500;
};
