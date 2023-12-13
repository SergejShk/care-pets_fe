export interface IFirstStepRegistration {
	email: string;
	password: string;
}

export interface FirstStepRegistrationFormValues extends IFirstStepRegistration {
	confirmPassword: string;
}
