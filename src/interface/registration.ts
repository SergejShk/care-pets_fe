export interface IFirstStepRegistration {
	email: string;
	password: string;
}

export interface FirstStepRegistrationFormValues extends IFirstStepRegistration {
	confirmPassword: string;
}

export interface SecondStepRegistrationFormValues {
	name: string;
	city: string;
	phone: string;
}
