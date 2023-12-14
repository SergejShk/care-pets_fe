import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SignInNav from "../common/SignInNav";
import Navigation from "../common/Navigation";
import Button from "../common/Button";
import Person from "../common/icons/Person";

import { useModalContext } from "../../context/ModalProvider";
import { useAuthContext } from "../../context/AuthProvider";

import { ButtonTheme } from "../../interface/styles";

const MobileMenu = () => {
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

	const { auth } = useAuthContext();
	const { modal } = useModalContext();

	const isAuth = !!auth.email;
	const { isMobileMenuOpen } = modal;

	return (
		<MobileMenuStyled className={isMobileMenuOpen ? "isOpen" : ""}>
			{isMobile && !isAuth && <SignInNav />}
			{!isMobile && isAuth && (
				<Link to="/account">
					<Button type="button" btntheme={ButtonTheme.Orange}>
						<Person />
						Account
					</Button>
				</Link>
			)}

			<Navigation />
		</MobileMenuStyled>
	);
};

export default MobileMenu;

const MobileMenuStyled = styled.div`
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%) translateY(100%);
	z-index: 10;
	display: flex;
	flex-direction: column;
	padding: 46px 0 0;
	background-color: ${({ theme }) => theme.backgroundColor.main};
	width: calc(100% - 40px);
	height: calc(100% - 46px);
	margin: 0 auto;
	padding: 46px 20px 0;
	transition: transform 800ms cubic-bezier(0.4, 0, 0.2, 1);

	&.isOpen {
		transform: translateX(-50%) translateY(0%);
	}

	@media screen and (min-width: 768px) {
		padding: 0 32px;
		width: calc(100% - 64px);
		height: 100%;
	}
`;
