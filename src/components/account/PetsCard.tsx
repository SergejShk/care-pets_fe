import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import Trash from "../common/icons/Trash";

import { convertDateToInputString, convertDateToString } from "../../utils/dateFormatter";

import { IPetApi } from "../../interface/pets";

const BUCKET_PATH = import.meta.env.VITE_BUCKET_PATH;

interface IProps {
	pet: IPetApi;
}

const PetsCard: FC<IProps> = ({ pet }) => {
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

	const photoSrc = pet?.photo?.originalKey ? BUCKET_PATH + pet?.photo?.originalKey : "";
	const birthday = convertDateToString(new Date(pet.birthday));
	const normalizedBirthday = convertDateToInputString(birthday);

	return (
		<PetsCardStyled>
			<Avatar src={photoSrc || "/pet-avatar.png"} alt="pet avatar" />

			<DescriptionList>
				<Description>Name: {pet.name}</Description>
				<Description>Date of birth: {normalizedBirthday}</Description>
				<Description>Breed: {pet.breed}</Description>
				<Description>Comments: {pet.comments}</Description>
				<DeleteBtn>
					<Trash width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} />
				</DeleteBtn>
			</DescriptionList>
		</PetsCardStyled>
	);
};

export default PetsCard;

const PetsCardStyled = styled.li`
	width: calc(280px - 40px);
	display: flex;
	flex-direction: column;
	gap: 40px;
	margin: 0 auto;
	padding: 16px 20px 40px;
	background-color: ${({ theme }) => theme.backgroundColor.white};
	border-radius: 20px;
	box-shadow: 7px 4px 14px 0px rgba(0, 0, 0, 0.11);

	@media screen and (min-width: 768px) {
		width: calc(736px - 72px);
		flex-direction: row;
		justify-content: flex-start;
		gap: 52px;
		border-radius: 40px;
		padding: 20px;
	}

	@media screen and (min-width: 1280px) {
		width: calc(821px - 40px);
		gap: 32px;
	}
`;

const Avatar = styled.img`
	display: block;
	width: 240px;
	height: 240px;
	border-radius: 20px;
	box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.11);
	margin: 0 auto;
	background-color: ${({ theme }) => theme.backgroundColor.white};

	@media screen and (min-width: 768px) {
		width: 161px;
		height: 161px;
	}
`;

const DescriptionList = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 0 30px 0 0;

	@media screen and (min-width: 768px) {
		width: inherit;
		padding: 0 50px 0 0;
	}
`;

const Description = styled.p`
	font-size: 14px;
	line-height: normal;
	letter-spacing: 0.56px;
	color: ${({ theme }) => theme.textColor.black};

	@media screen and (min-width: 768px) {
		font-size: 16px;
		font-weight: 500;
		line-height: 22px;
		letter-spacing: 0.64px;
	}
`;

const DeleteBtn = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	backdrop-filter: blur(2px);
	border: none;
	cursor: pointer;
	border-radius: 50%;
	padding: 0;

	@media screen and (min-width: 768px) {
		width: 44px;
		height: 44px;
		background-color: ${({ theme }) => theme.backgroundColor.main};
	}
`;
