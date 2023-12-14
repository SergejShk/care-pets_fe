import { FC } from "react";
import styled from "styled-components";

interface IProps {
	message: string;
}

const ErrorMessage: FC<IProps> = ({ message }) => {
	return <ErrorMessageStyled>{message} </ErrorMessageStyled>;
};

export default ErrorMessage;

const ErrorMessageStyled = styled.p`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: -15px;
	font-size: 10px;
	color: ${({ theme }) => theme.textColor.error};
`;
