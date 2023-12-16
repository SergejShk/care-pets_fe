import { FC } from "react";
import styled from "styled-components";

import PhotoCamera from "../common/icons/PhotoCamera";
import Pencil from "../common/icons/Pencil";

import LogOutBtn from "./LogOutBtn";
import { IUser } from "../../interface/user";

interface IProps {
	user: IUser;
}

const ProfileCard: FC<IProps> = ({ user }) => {
	const date = user?.birthday ? new Date(user?.birthday).toLocaleDateString() : "";

	return (
		<ProfileCardStyled>
			<PhotoBlock>
				<Avatar src={user?.photo || "/avatar.png"} alt="user avatar" />
				<EditPhotoBtn>
					<PhotoCamera />
					Edit photo
				</EditPhotoBtn>
			</PhotoBlock>

			<InfoBlock>
				<InfoList>
					<InfoItem>
						<InfoTitle>Name: </InfoTitle>
						<InfoValueText>{user.name}</InfoValueText>
						<EditInfoBtn>
							<Pencil />
						</EditInfoBtn>
					</InfoItem>

					<InfoItem>
						<InfoTitle>Email: </InfoTitle>
						<InfoValueText>{user.email}</InfoValueText>
						<EditInfoBtn>
							<Pencil />
						</EditInfoBtn>
					</InfoItem>

					<InfoItem>
						<InfoTitle>Birthday: </InfoTitle>
						<InfoValueText>{date}</InfoValueText>
						<EditInfoBtn>
							<Pencil />
						</EditInfoBtn>
					</InfoItem>

					<InfoItem>
						<InfoTitle>Phone: </InfoTitle>
						<InfoValueText>{user.phone}</InfoValueText>
						<EditInfoBtn>
							<Pencil />
						</EditInfoBtn>
					</InfoItem>

					<InfoItem>
						<InfoTitle>City: </InfoTitle>
						<InfoValueText>{user.city}</InfoValueText>
						<EditInfoBtn>
							<Pencil />
						</EditInfoBtn>
					</InfoItem>
				</InfoList>
				<LogOutBtn />
			</InfoBlock>
		</ProfileCardStyled>
	);
};

export default ProfileCard;

const ProfileCardStyled = styled.div`
	width: calc(280px - 40px);
	display: flex;
	flex-direction: column;
	gap: 37px;
	margin: 0 auto;
	padding: 20px 12px 20px 16px;
	background-color: ${({ theme }) => theme.backgroundColor.white};
	border-radius: 20px;
	box-shadow: 7px 4px 14px 0px rgba(0, 0, 0, 0.11);

	@media screen and (min-width: 768px) {
		width: calc(736px - 72px);
		flex-direction: row-reverse;
		justify-content: space-between;
		gap: 52px;
		border-radius: 0px 40px 40px 0px;
		padding: 24px 40px 25px 32px;
		margin: 0;
	}

	@media screen and (min-width: 1280px) {
		width: calc(411px - 32px);
		padding: 20px 16px 42px;
		flex-direction: column;
		gap: 32px;
	}
`;

const PhotoBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 12px;

	@media screen and (min-width: 768px) {
		gap: 8px;
		width: 233px;
	}

	@media screen and (min-width: 1280px) {
		position: relative;
		flex-direction: row;
		gap: 0;
	}
`;

const Avatar = styled.img`
	display: block;
	width: 233px;
	height: 233px;
	border-radius: 50%;
	box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.11);
	margin: 0 auto;

	@media screen and (min-width: 1280px) {
		margin: 0 0 0 73px;
	}
`;

const EditPhotoBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	line-height: 22px;
	letter-spacing: 0.48px;
	background-color: transparent;
	border: none;
	cursor: pointer;

	@media screen and (min-width: 1280px) {
		position: absolute;
		right: -150px;
		bottom: 0;
		margin: 0 0 0 -25px;
	}
`;

const InfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 42px;

	@media screen and (min-width: 768px) {
		width: calc(100% - 285px);
		padding: 20px 0 0;
		align-items: flex-start;
	}

	@media screen and (min-width: 1280px) {
		width: 100%;
		padding: 0;
	}
`;

const InfoList = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const InfoItem = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
`;

const InfoTitle = styled.h3`
	width: 30%;
	font-size: 12px;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.48px;
	padding: 0 5px 0 0;

	@media screen and (min-width: 768px) {
		font-size: 18px;
	}
`;

const InfoValueText = styled.p`
	width: 58%;
	font-size: 12px;
	line-height: normal;
	letter-spacing: 0.48px;
	padding: 0 5px 0 0;

	@media screen and (min-width: 768px) {
		font-size: 18px;
		width: 62%;
	}
`;

const EditInfoBtn = styled.button`
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.backgroundColor.main};
	backdrop-filter: blur(2px);
	border: none;
	cursor: pointer;
	border-radius: 50%;
	padding: 0;

	@media screen and (min-width: 768px) {
		width: 32px;
		height: 32px;
	}
`;
