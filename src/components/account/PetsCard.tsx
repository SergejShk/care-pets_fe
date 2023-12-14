import { FC } from "react";
import styled from "styled-components";

const PetsCard: FC = () => {
	return <PetsCardStyled>PETS CARD</PetsCardStyled>;
};

export default PetsCard;

const PetsCardStyled = styled.div`
	display: flex;
	height: 400px;
	width: 100%;
	background-color: #47c5ff;
`;
