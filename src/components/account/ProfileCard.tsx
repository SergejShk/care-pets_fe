import { FC } from "react";
import styled from "styled-components";

const ProfileCard: FC = () => {
	return <ProfileCardStyled>PROFILE CARD</ProfileCardStyled>;
};

export default ProfileCard;

const ProfileCardStyled = styled.div`
	display: flex;
	height: 400px;
	width: 100%;
	background-color: tomato;
`;
