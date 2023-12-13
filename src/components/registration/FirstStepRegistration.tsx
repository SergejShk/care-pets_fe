import { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Input from "../common/Input";
import Button from "../common/Button";

import { FirstStepRegistrationFormValues, IFirstStepRegistration } from "../../interface/registration";
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
	} = useForm<FirstStepRegistrationFormValues>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = ({ email, password, confirmPassword }: FirstStepRegistrationFormValues) => {
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
				type="email"
				name="email"
				placeholder="Email"
				register={register}
				rules={{
					required: { value: true, message: "Required" },
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
				}}
				error={errors.confirmPassword}
			/>

			<Button btntheme={ButtonTheme.Orange} style={{ marginTop: "24px" }}>
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
