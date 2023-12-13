import styled from "styled-components";

import Logo from "./Logo";
import SignInNav from "./SignInNav";
import Navigation from "../common/Navigation";

import Burger from "../common/icons/Burger";

const Header = () => {
	const screenWidth = window.innerWidth;

	return (
		<HeaderStyled>
			<NavWrapper>
				<Logo />
				{screenWidth > 1279 && <Navigation />}
			</NavWrapper>

			<MenuWrapper>
				<SignInNav />
				<BurgerWrapper>
					<Burger />
				</BurgerWrapper>
			</MenuWrapper>
		</HeaderStyled>
	);
};

export default Header;

const HeaderStyled = styled.div`
	max-width: 320px;
	display: flex;
	margin: 0 auto;
	align-items: center;
	justify-content: space-between;
	padding: 12px 20px 0;

	@media screen and (min-width: 768px) {
		max-width: 768px;
		padding: 24px 32px 0;
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		padding: 20px 16px 0;
	}
`;

const NavWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 80px;
`;

const MenuWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

const BurgerWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	@media screen and (min-width: 1280px) {
		display: none;
	}
`;
