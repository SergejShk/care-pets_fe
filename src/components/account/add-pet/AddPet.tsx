import { FC, useState } from "react";
import styled from "styled-components";

import Modal from "../../common/Modal";
import FirstStep from "./FirstStep";

import { IFirstStepAddPetFormValues } from "../../../interface/pets";

interface IProps {
	onClose: () => void;
}

const AddPet: FC<IProps> = ({ onClose }) => {
	const [isFirstStep, setIsFirstStep] = useState(true);
	const [firstStepValue, setFirstStepValue] = useState<IFirstStepAddPetFormValues | null>(null);

	console.log("firstStepValue", firstStepValue);

	return (
		<>
			<Modal onModalClose={onClose}>
				<AddPetStyled>
					<Title>Add pet</Title>

					{isFirstStep && (
						<FirstStep
							onClose={onClose}
							setFirstStepValue={setFirstStepValue}
							setIsFirstStep={setIsFirstStep}
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
`;
