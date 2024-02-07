import { FC, useRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import Button from "../../common/Button";
import PlusIcon from "../../common/icons/Plus";

import { ISecondStepAddPetFormValues } from "../../../interface/pets";
import { FolderType } from "../../../interface/files";
import { ButtonTheme } from "../../../interface/styles";

interface IProps {
	photoSrc: string;
	isLoading?: boolean;
	errors: FieldErrors<ISecondStepAddPetFormValues>;
	register: UseFormRegister<ISecondStepAddPetFormValues>;
	onGoToFirstStep: () => void;
	onPhotoUpload: (file: File, folderType: FolderType) => Promise<void>;
	onSubmitForm: React.FormEventHandler<HTMLFormElement>;
}

const SecondStep: FC<IProps> = ({
	photoSrc,
	isLoading = false,
	errors,
	register,
	onGoToFirstStep,
	onPhotoUpload,
	onSubmitForm,
}) => {
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

	const photoInputRef = useRef<HTMLInputElement | null>(null);

	const onEditPhotoClick = () => photoInputRef.current?.click();

	const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];

		if (!file) return;

		onPhotoUpload(file, FolderType.Pets);
	};

	return (
		<SecondStepStyled>
			<PhotoBlock>
				<LabelPhoto>Add photo and some comments</LabelPhoto>
				<input
					className="hidden"
					type="file"
					ref={photoInputRef}
					accept="image/*,.png,.jpg,.jpeg"
					onChange={handlePhotoChange}
				/>

				<PhotoWrapper onClick={onEditPhotoClick}>
					{!photoSrc && <PlusIcon width="48px" height="48px" color="rgba(17, 17, 17, 0.60)" />}
					{photoSrc && <PhotoImg src={photoSrc} alt="photo of pet" />}
				</PhotoWrapper>
			</PhotoBlock>

			<FormStyled onSubmit={onSubmitForm}>
				<TextareaWrapper>
					<LabelComments>
						<span>Comments</span>
						<Textarea
							{...register("comments", {
								required: { value: true, message: "Required" },
								minLength: { value: 8, message: "Min length 8 characters" },
								maxLength: { value: 120, message: "Max length 120 characters" },
							})}
							placeholder="Type comments"
						></Textarea>
					</LabelComments>

					{errors.comments && errors.comments && (
						<ErrorText role="alert">{errors.comments.message}</ErrorText>
					)}
				</TextareaWrapper>

				<BtnWrapper>
					<Button
						type="submit"
						btnTheme={ButtonTheme.Orange}
						style={{ minWidth: isMobile ? "" : 180, padding: isMobile ? "10px 28px" : "9px 28px" }}
						disabled={isLoading}
					>
						Done
					</Button>
					<Button
						type="button"
						btnTheme={ButtonTheme.White}
						onClick={onGoToFirstStep}
						style={{ minWidth: isMobile ? "" : 180, padding: isMobile ? "10px 28px" : "9px 28px" }}
						disabled={isLoading}
					>
						Back
					</Button>
				</BtnWrapper>
			</FormStyled>
		</SecondStepStyled>
	);
};

export default SecondStep;

const SecondStepStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	margin: 20px 0 0;

	@media screen and (min-width: 768px) {
		gap: 40px;
	}
`;

const PhotoBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const LabelPhoto = styled.label`
	color: ${({ theme }) => theme.textColor.black};
	text-align: center;
	font-size: 16px;
	font-weight: 500;
	letter-spacing: -0.16px;

	@media screen and (min-width: 768px) {
		font-size: 20px;
		letter-spacing: -0.2px;
	}
`;

const PhotoWrapper = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 208px;
	height: 208px;
	border-radius: 20px;
	box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.11);
	margin: 0 auto;
	background-color: ${({ theme }) => theme.backgroundColor.main};
	overflow: hidden;

	@media screen and (min-width: 768px) {
		width: 182px;
		height: 182px;
	}
`;

const PhotoImg = styled.img`
	display: block;
	width: 100%;
	height: 100%;
`;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;

	@media screen and (min-width: 768px) {
		width: 394px;
	}
`;

const TextareaWrapper = styled.div`
	position: relative;
`;

const LabelComments = styled.label`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	gap: 8px;
	color: ${({ theme }) => theme.textColor.black};
	font-size: 18px;
	font-weight: 500;
	line-height: 26.5px;

	@media screen and (min-width: 768px) {
		font-size: 24px;
		gap: 12px;
	}
`;

const Textarea = styled.textarea`
	width: calc(100% - 30px);
	height: calc(100px - 26px);
	flex-shrink: 0;
	border-radius: 20px;
	border: ${({ theme }) => `1px solid ${theme.borderColor.input}`};
	background-color: ${({ theme }) => theme.backgroundColor.main};
	padding: 12px 14px;
	color: ${({ theme }) => theme.textColor.black};
	font-family: Manrope;
	font-size: 14px;
	line-height: 26.5px;

	&:hover,
	&:focus {
		border: ${({ theme }) => `1px solid ${theme.borderColor.primaryAccent}`};
	}

	@media screen and (min-width: 768px) {
		font-size: 16px;
		height: calc(116px - 26px);
	}
`;

const ErrorText = styled.span`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: -15px;
	font-size: 10px;
	color: ${({ theme }) => theme.textColor.error};
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
