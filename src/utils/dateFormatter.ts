export const convertDateToString = (date?: Date): string =>
	date ? date.toLocaleDateString().split("/").join(".") : "";

export const convertDateFromString = (date: string): Date => {
	const normalisedDateString = date.split(".").reverse().join("-");

	return new Date(normalisedDateString);
};
