import { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Input from "../common/Input";
import Button from "../common/Button";

import { SecondStepRegistrationFormValues, IFirstStepRegistration } from "../../interface/registration";
import { ButtonTheme } from "../../interface/styles";

interface IProps {
	firstStepValues: IFirstStepRegistration;
}

const SecondStepRegistration: FC<IProps> = ({ firstStepValues }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SecondStepRegistrationFormValues>({
		defaultValues: {
			name: "",
			city: "",
			phone: "",
		},
	});

	const onSubmit = (formValues: SecondStepRegistrationFormValues) => {
		console.log({ ...firstStepValues, ...formValues });
	};

	return (
		<FormStyled className="form" onSubmit={handleSubmit(onSubmit)}>
			<Input
				type="text"
				name="name"
				placeholder="Name"
				register={register}
				rules={{
					required: { value: true, message: "Required" },
					minLength: { value: 3, message: "Min length 3 characters" },
					maxLength: { value: 40, message: "Max length 40 characters" },
				}}
				error={errors.name}
			/>

			<Input
				type="text"
				name="city"
				placeholder="City"
				register={register}
				rules={{
					required: { value: true, message: "Required" },
					minLength: { value: 2, message: "Min length 2 characters" },
					maxLength: { value: 40, message: "Max length 40 characters" },
				}}
				error={errors.city}
			/>

			<Input
				type="text"
				name="phone"
				placeholder="Phone"
				register={register}
				rules={{
					required: { value: true, message: "Required" },
					minLength: { value: 5, message: "Min length 5 characters" },
					maxLength: { value: 20, message: "Max length 20 characters" },
					pattern: {
						value: /^[0-9]+$/,
						message: "Must contain only numbers",
					},
				}}
				error={errors.phone}
			/>

			<Button btntheme={ButtonTheme.Orange} style={{ marginTop: "24px" }}>
				Register
			</Button>
		</FormStyled>
	);
};

export default SecondStepRegistration;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
