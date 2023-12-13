import { FC } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import Button from "./Button";

import { ButtonTheme } from "../../interface/styles";

const SignInNav: FC = () => {
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
	const btnFontSize = isMobile ? "14px" : "20px";

	return (
		<SignInNavStyled>
			<Link to="/login">
				<Button fontSize={btnFontSize}>Login</Button>
			</Link>

			<Link to="/registration">
				<Button btntheme={ButtonTheme.Orange} fontSize={btnFontSize}>
					Registration
				</Button>
			</Link>
		</SignInNavStyled>
	);
};

export default SignInNav;

const SignInNavStyled = styled.div<{ isMobile?: boolean }>`
	max-width: 320px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;

	@media screen and (min-width: 768px) {
		max-width: 768px;
		padding: 0 32px;
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		padding: 0 16px;
	}
`;
