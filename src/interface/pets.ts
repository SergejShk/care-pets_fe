import { IPhoto } from "./common";

export interface IFirstStepAddPetFormValues {
	name: string;
	birthday: string;
	breed: string;
}

export interface ISecondStepAddPetFormValues {
	comments: string;
}

export interface IPet extends IFirstStepAddPetFormValues, ISecondStepAddPetFormValues {
	photo?: IPhoto | null;
}

export interface IPetApi {
	name: string;
	birthday: Date;
	breed: string;
	comments: string;
	photo?: IPhoto | null;
}
