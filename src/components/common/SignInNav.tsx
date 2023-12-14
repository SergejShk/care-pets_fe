import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useModalContext } from "../../context/ModalProvider";

const SignInNav: FC = () => {
	const { setModal } = useModalContext();

	const onLinkClick = () => {
		setModal((prev) => ({ ...prev, isMobileMenuOpen: false }));
	};

	return (
		<SignInNavStyled>
			<NavLinkStyled to="/login" onClick={onLinkClick}>
				Login
			</NavLinkStyled>

			<NavLinkStyled to="/registration" onClick={onLinkClick}>
				Registration
			</NavLinkStyled>
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

const NavLinkStyled = styled(NavLink)`
	position: relative;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	font-size: 14px;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.8px;
	border-radius: 40px;
	border: ${({ theme }) => `2px solid ${theme.borderColor.primary}`};
	padding: 10px 28px;
	color: ${({ theme }) => theme.textColor.black};
	background-color: ${({ theme }) => theme.textColor.white};

	@media screen and (min-width: 768px) {
		font-size: 20px;
	}

	&:hover {
		border-color: ${({ theme }) => theme.borderColor.primaryAccent};
	}

	&.active {
		color: ${({ theme }) => theme.textColor.white};
		background-color: ${({ theme }) => theme.textColor.primary};
	}
`;
