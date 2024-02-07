import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "./Logo";
import SignInNav from "../common/SignInNav";
import Navigation from "../common/Navigation";
import Button from "../common/Button";
// import Burger from "../common/icons/Burger";
import Person from "../common/icons/Person";

import { useModalContext } from "../../context/ModalProvider";
import { useAuthContext } from "../../context/AuthProvider";

import { ButtonTheme } from "../../interface/styles";

const Header = () => {
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
	const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

	const { setModal } = useModalContext();
	const { auth } = useAuthContext();

	const isAuth = !!auth.email;

	const onBurgerClick = () => {
		setModal((prev) => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
	};

	return (
		<HeaderStyled>
			<NavWrapper>
				<Logo />
				{isDesktop && <Navigation />}
			</NavWrapper>

			<MenuWrapper>
				{!isMobile && !isAuth && <SignInNav />}
				{!isMobile && isAuth && (
					<Link to="/account">
						<Button type="button" btnTheme={ButtonTheme.Orange}>
							<Person />
							Account
						</Button>
					</Link>
				)}

				<BurgerWrapper onClick={onBurgerClick}>{/* <Burger /> */}</BurgerWrapper>
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
		max-width: calc(768px - 48px);
		padding: 24px 32px 0;
	}
	@media screen and (min-width: 1280px) {
		max-width: calc(1280px - 40px);
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
