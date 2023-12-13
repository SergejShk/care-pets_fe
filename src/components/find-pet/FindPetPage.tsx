import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import MobileMenu from "../mobile-menu/MobileMenu";

const FindPetPage = () => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

	return <FindPetStyled>Find Pet page{!isDesktop && <MobileMenu />}</FindPetStyled>;
};

export default FindPetPage;

const FindPetStyled = styled.div`
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
