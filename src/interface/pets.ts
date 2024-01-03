export interface IFirstStepAddPetFormValues {
	name: string;
	birthday: string;
	breed: string;
}

export interface IPet extends IFirstStepAddPetFormValues {
	comments: string;
	photo?: string;
}
