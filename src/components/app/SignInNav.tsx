import { FC } from "react";
import styled from "styled-components";

import Button from "../common/Button";

import { ButtonTheme } from "../../interface/styles";

interface IProps {
	isMobile?: boolean;
}

const SignInNav: FC<IProps> = ({ isMobile }) => {
	const screenWidth = window.innerWidth;
	const btnFontSize = screenWidth < 768 ? "14px" : "20px";

	return (
		<SignInNavStyled isMobile={isMobile}>
			<Button fontSize={btnFontSize}>Login</Button>
			<Button btntheme={ButtonTheme.Orange} fontSize={btnFontSize}>
				Registration
			</Button>
		</SignInNavStyled>
	);
};

export default SignInNav;

const SignInNavStyled = styled.div<{ isMobile?: boolean }>`
	display: ${({ isMobile }) => (isMobile ? "flex" : "none")};
	align-items: center;
	justify-content: center;
	gap: 12px;

	@media screen and (min-width: 768px) {
		display: ${({ isMobile }) => (isMobile ? "none" : "flex")};
	}
`;
