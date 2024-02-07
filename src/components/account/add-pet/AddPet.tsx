import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Modal from "../../common/Modal";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

import { useCreatePet } from "../../../api/mutations/pets/useCreatePet";

import { usePhotoUpload } from "../../../hooks/usePhotoUpload";

import { IFirstStepAddPetFormValues, ISecondStepAddPetFormValues } from "../../../interface/pets";

const BUCKET_PATH = import.meta.env.VITE_BUCKET_PATH;

interface IProps {
	onClose: () => void;
}

const AddPet: FC<IProps> = ({ onClose }) => {
	const [isFirstStep, setIsFirstStep] = useState(true);
	const [firstStepValue, setFirstStepValue] = useState<IFirstStepAddPetFormValues | null>(null);

	const { data: newPetData, isPending, mutate: createNewPet } = useCreatePet();
	const { uploadedPhoto, handlePhotoUpload } = usePhotoUpload();

	const {
		register: registerSecondStep,
		handleSubmit: handleSubmitSecondStep,
		formState: { errors: errorsSecondStep },
	} = useForm<ISecondStepAddPetFormValues>({
		defaultValues: {
			comments: "",
		},
	});

	const onGoToFirstStep = () => setIsFirstStep(true);

	const handleSubmitForm = ({ comments }: ISecondStepAddPetFormValues) => {
		if (!firstStepValue) return;
		const birthday = new Date(firstStepValue.birthday);

		createNewPet({ body: { ...firstStepValue, birthday, comments, photo: uploadedPhoto } });
	};

	useEffect(() => {
		if (!newPetData) return;

		onClose();
	}, [newPetData, onClose]);

	const photoSrc = uploadedPhoto?.originalKey ? BUCKET_PATH + uploadedPhoto.originalKey : "";

	return (
		<>
			<Modal onModalClose={onClose}>
				<AddPetStyled>
					<Title>Add pet</Title>

					{isFirstStep && (
						<FirstStep
							onClose={onClose}
							initialState={firstStepValue}
							setFirstStepValue={setFirstStepValue}
							setIsFirstStep={setIsFirstStep}
						/>
					)}

					{!isFirstStep && firstStepValue && (
						<SecondStep
							photoSrc={photoSrc}
							isLoading={isPending}
							errors={errorsSecondStep}
							register={registerSecondStep}
							onGoToFirstStep={onGoToFirstStep}
							onPhotoUpload={handlePhotoUpload}
							onSubmitForm={handleSubmitSecondStep(handleSubmitForm)}
						/>
					)}
				</AddPetStyled>
			</Modal>
		</>
	);
};

export default AddPet;

const AddPetStyled = styled.div`
	padding: 40px 20px;

	@media screen and (min-width: 768px) {
		padding: 40px 80px;
	}
`;

const Title = styled.h3`
	font-size: 24px;
	font-weight: 500;
	color: ${({ theme }) => theme.textColor.black};
	text-align: center;

	@media screen and (min-width: 768px) {
		font-size: 36px;
	}
`;
