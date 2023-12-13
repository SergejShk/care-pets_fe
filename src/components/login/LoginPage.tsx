import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import MobileMenu from "../mobile-menu/MobileMenu";

const LoginPage = () => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

	return (
		<LoginStyled>
			<Title>Login{!isDesktop && <MobileMenu />}</Title>
		</LoginStyled>
	);
};

export default LoginPage;

const LoginStyled = styled.div`
	position: relative;
	max-width: 320px;
	min-height: calc(100vh - 60px);
	margin: 0 auto;
	padding: 0 20px;
	overflow: hidden;

	@media screen and (min-width: 768px) {
		max-width: 768px;
		padding: 0 32px;
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		padding: 0 16px;
	}
`;

const Title = styled.h2`
	display: block;
	font-size: 24px;
	font-weight: 700;
	line-height: normal;
	letter-spacing: 0.96px;
	margin: 42px 0 40px;
	text-align: center;
`;
