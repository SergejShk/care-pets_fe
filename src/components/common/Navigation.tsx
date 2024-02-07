import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useModalContext } from "../../context/ModalProvider";

interface INavItem {
	name: string;
	to: string;
}

const navItems: INavItem[] = [
	// { name: "News", to: "/news" },
	// { name: "Find pet", to: "/find-pet" },
	// { name: "Our friend", to: "/our-friend" },
];

const Navigation = () => {
	const { setModal } = useModalContext();

	const onLinkClick = () => {
		setModal((prev) => ({ ...prev, isMobileMenuOpen: false }));
	};

	return (
		<NavigationStyled>
			{!!navItems.length &&
				navItems.map((item) => (
					<li key={item.to} onClick={onLinkClick}>
						<NavLinkStyled to={item.to}>{item.name}</NavLinkStyled>
					</li>
				))}
		</NavigationStyled>
	);
};

export default Navigation;

const NavigationStyled = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 40px;
	margin: 60px 0 0;

	@media screen and (min-width: 768px) {
		gap: 36px;
		margin: 88px 0 0;
	}

	@media screen and (min-width: 1280px) {
		flex-direction: row;
		gap: 80px;
		margin: 0;
	}
`;

const NavLinkStyled = styled(NavLink)`
	font-size: 32px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 1.28px;
	color: ${({ theme }) => theme.textColor.black};

	@media screen and (min-width: 768px) {
		font-size: 48px;
		letter-spacing: 1.92px;
	}

	@media screen and (min-width: 1280px) {
		font-size: 20px;
		letter-spacing: 0.8px;
	}

	&.active,
	&:hover {
		color: ${({ theme }) => theme.textColor.primary};
		text-decoration: underline;
	}
`;
