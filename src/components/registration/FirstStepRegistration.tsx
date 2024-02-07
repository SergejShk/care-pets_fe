import { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Input from "../common/Input";
import Button from "../common/Button";

import { IFirstStepRegistrationFormValues, IFirstStepRegistration } from "../../interface/registration";
import { ButtonTheme } from "../../interface/styles";

interface IProps {
	setDataFirstStep: React.Dispatch<React.SetStateAction<IFirstStepRegistration | null>>;
}

const FirstStepRegistration: FC<IProps> = ({ setDataFirstStep }) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IFirstStepRegistrationFormValues>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = ({ email, password, confirmPassword }: IFirstStepRegistrationFormValues) => {
		if (password !== confirmPassword) {
			setError("confirmPassword", {
				type: "manual",
				message: "Mismatch",
			});
			return;
		}
		setDataFirstStep({ email, password });
	};

	return (
		<FormStyled className="form" onSubmit={handleSubmit(onSubmit)}>
			<Input
				type="text"
				name="email"
				placeholder="Email"
				register={register}
				rules={{
					required: { value: true, message: "Required" },
					pattern: {
						value:
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						message: "Please enter a valid email",
					},
				}}
				error={errors.email}
			/>

			<Input
				type="password"
				name="password"
				placeholder="Password"
				register={register}
				rules={{
					required: { value: true, message: "Required" },
					minLength: { value: 7, message: "Min length 7 characters" },
					maxLength: { value: 32, message: "Max length 32 characters" },
				}}
				error={errors.password}
			/>

			<Input
				type="password"
				name="confirmPassword"
				placeholder="Confirm Password"
				register={register}
				rules={{
					required: { value: true, message: "Required" },
					minLength: { value: 7, message: "Min length 7 characters" },
					maxLength: { value: 32, message: "Max length 32 characters" },
				}}
				error={errors.confirmPassword}
			/>

			<Button btnTheme={ButtonTheme.Orange} style={{ marginTop: "24px" }}>
				Next
			</Button>
		</FormStyled>
	);
};

export default FirstStepRegistration;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
