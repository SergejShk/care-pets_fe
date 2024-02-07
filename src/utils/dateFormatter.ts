export const convertDateToString = (date?: Date): string =>
	date ? date.toLocaleDateString().split("/").reverse().join("/") : "";

export const convertDateToInputString = (date?: string): string =>
	date ? date.split("/").reverse().join(".") : "";

export const convertDateFromString = (date: string): Date => {
	const normalisedDateString = date.split(".").reverse().join("-");

	return new Date(normalisedDateString);
};
