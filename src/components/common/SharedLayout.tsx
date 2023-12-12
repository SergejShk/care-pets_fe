import { FC, ReactNode } from "react";
import styled from "styled-components";

interface IProps {
	children: ReactNode;
}

const SharedLayout: FC<IProps> = ({ children }) => {
	return <LayoutStyled>{children}</LayoutStyled>;
};

export default SharedLayout;

const LayoutStyled = styled.div`
	position: relative;
	height: 100vh;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.backgroundColor.main};
	/* padding: 0 20px;

	@media screen and (min-width: 768px) {
		padding: 0 32px;
	}
	@media screen and (min-width: 1280px) {
		padding: 0 16px;
	} */
`;
