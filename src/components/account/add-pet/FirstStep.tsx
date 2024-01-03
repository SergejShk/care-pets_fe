import { FC } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Input from "../../common/Input";
import Button from "../../common/Button";

import { IFirstStepAddPetFormValues } from "../../../interface/pets";
import { ButtonTheme } from "../../../interface/styles";

interface IProps {
	onClose: () => void;
	setFirstStepValue: React.Dispatch<React.SetStateAction<IFirstStepAddPetFormValues | null>>;
	setIsFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstStep: FC<IProps> = ({ onClose, setFirstStepValue, setIsFirstStep }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFirstStepAddPetFormValues>({
		defaultValues: {
			name: "",
			birthday: "",
			breed: "",
		},
	});

	const onSubmitForm = (values: IFirstStepAddPetFormValues) => {
		setFirstStepValue(values);
		setIsFirstStep(false);
	};

	return (
		<>
			<FormStyled onSubmit={handleSubmit(onSubmitForm)}>
				<Input
					type="text"
					name="name"
					label="Name pet"
					placeholder="Type name pet"
					register={register}
					rules={{
						required: { value: true, message: "Required" },
						minLength: { value: 2, message: "Min length 2 characters" },
						maxLength: { value: 16, message: "Max length 16 characters" },
					}}
					error={errors.name}
				/>

				<Input
					type="text"
					name="birthday"
					label="Date of birth"
					placeholder="Type date of birth"
					register={register}
					rules={{
						required: { value: true, message: "Required" },
					}}
					error={errors.birthday}
				/>

				<Input
					type="text"
					name="breed"
					label="Breed"
					placeholder="Type breed"
					register={register}
					rules={{
						required: { value: true, message: "Required" },
						minLength: { value: 2, message: "Min length 2 characters" },
						maxLength: { value: 16, message: "Max length 16 characters" },
					}}
					error={errors.birthday}
				/>

				<BtnWrapper>
					<Button type="submit" btntheme={ButtonTheme.Orange}>
						Next
					</Button>
					<Button type="button" btntheme={ButtonTheme.White} onClick={onClose}>
						Cancel
					</Button>
				</BtnWrapper>
			</FormStyled>
		</>
	);
};

export default FirstStep;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 28px 0 0;

	@media screen and (min-width: 768px) {
		padding: 40px 0 0;
	}
`;

const BtnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 12px;
`;
