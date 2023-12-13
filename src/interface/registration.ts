export interface IFirstStepRegistration {
	email: string;
	password: string;
}

export interface IFirstStepRegistrationFormValues extends IFirstStepRegistration {
	confirmPassword: string;
}

export interface ISecondStepRegistrationFormValues {
	name: string;
	city: string;
	phone: string;
}

export interface IRegistrationReq extends IFirstStepRegistration, ISecondStepRegistrationFormValues {}

export interface IRegisteredUser {
	id: string;
	email: string;
	name: string;
	city: string;
	phone: string;
}
