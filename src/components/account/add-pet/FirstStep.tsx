import { FC, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import Input from "../../common/Input";
import Button from "../../common/Button";
import Datepicker from "../../common/Datepicker";

import { petSchema } from "../../../validation/pet";

import {
	convertDateFromString,
	convertDateToInputString,
	convertDateToString,
} from "../../../utils/dateFormatter";

import { TDateValue } from "../../../interface/common";
import { IFirstStepAddPetFormValues } from "../../../interface/pets";
import { ButtonTheme } from "../../../interface/styles";

interface IProps {
	initialState: IFirstStepAddPetFormValues | null;
	onClose: () => void;
	setFirstStepValue: React.Dispatch<React.SetStateAction<IFirstStepAddPetFormValues | null>>;
	setIsFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstStep: FC<IProps> = ({ initialState, onClose, setFirstStepValue, setIsFirstStep }) => {
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

	const birthdayRef = useRef<HTMLInputElement | null>(null);

	const {
		register,
		setValue,
		handleSubmit,
		setError,
		control,
		formState: { errors },
	} = useForm<IFirstStepAddPetFormValues>({
		defaultValues: {
			name: initialState?.name || "",
			birthday: initialState?.birthday || "",
			breed: initialState?.breed || "",
		},
	});

	const validateBirthday = (value: string) => {
		const convertedValueToDate = convertDateFromString(value);

		const validatedValue = petSchema.birthday.safeParse(value);
		const validatedConvertedValueToDate = petSchema.birthday.safeParse(convertedValueToDate);

		if (!validatedValue.success || !validatedConvertedValueToDate.success) {
			setError("birthday", {
				type: "valueAsDate",
				message: "Invalid date",
			});

			return false;
		}

		setError("birthday", {});
		return true;
	};

	const onManualDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		validateBirthday(value);
		setValue(`birthday`, value);
	};

	const onBirthdayChange = (value: TDateValue) => {
		const birthdayString = convertDateToString(value as Date);

		setError("birthday", {});
		setValue(`birthday`, birthdayString);
	};

	const onSubmitForm = (values: IFirstStepAddPetFormValues) => {
		const isValidBirthday = validateBirthday(values.birthday);
		if (!isValidBirthday) return;

		setFirstStepValue(values);
		setIsFirstStep(false);
	};

	const datePickerInputStyle = {
		width: isMobile ? "calc(100% - 30px)" : "calc(100% - 66px)",
		fontSize: isMobile ? 14 : 16,
		letterSpacing: isMobile ? 0.56 : 0.72,
		padding: isMobile ? "11px 14px" : "15px 32px 14px",
	};

	return (
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
				inputFontSize={isMobile ? "14px" : "16px"}
			/>

			<Controller
				name="birthday"
				control={control}
				rules={{ required: { value: true, message: "Required" } }}
				render={({ field }) => (
					<Datepicker
						inputRef={birthdayRef}
						id="birthday"
						value={convertDateToInputString(field.value)}
						handleChange={onBirthdayChange}
						handleManualInputChange={onManualDateChange}
						label="Date of birth"
						placeholder="Type date of birth"
						hasFocus
						error={errors.birthday}
						inputStyle={datePickerInputStyle}
						positionCalendar={{ left: "0px" }}
					/>
				)}
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
				error={errors.breed}
				inputFontSize={isMobile ? "14px" : "16px"}
			/>

			<BtnWrapper>
				<Button
					type="submit"
					btnTheme={ButtonTheme.Orange}
					style={{ minWidth: isMobile ? "" : 180, padding: isMobile ? "10px 28px" : "9px 28px" }}
				>
					Next
				</Button>
				<Button
					type="button"
					btnTheme={ButtonTheme.White}
					onClick={onClose}
					style={{ minWidth: isMobile ? "" : 180, padding: isMobile ? "10px 28px" : "9px 28px" }}
				>
					Cancel
				</Button>
			</BtnWrapper>
		</FormStyled>
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

	@media screen and (min-width: 768px) {
		flex-direction: row-reverse;
		gap: 20px;
		justify-content: center;
		margin-top: 22px;
	}
`;
