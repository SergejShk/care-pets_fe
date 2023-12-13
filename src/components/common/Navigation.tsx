import { NavLink } from "react-router-dom";
import styled from "styled-components";

const navItems = [
	{ name: "News", to: "/news" },
	{ name: "Find pet", to: "/find-pet" },
	{ name: "Our friend", to: "/our-friend" },
];

const Navigation = () => {
	return (
		<NavigationStyled>
			{navItems.map((item) => (
				<li key={item.to}>
					<NavLinkStyled to={item.to}>{item.name}</NavLinkStyled>
				</li>
			))}
		</NavigationStyled>
	);
};

export default Navigation;

const NavigationStyled = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 80px;
	font-size: 20px;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.8px;
`;

const NavLinkStyled = styled(NavLink)`
	font-size: 20px;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.8px;
	color: ${({ theme }) => theme.textColor.black};

	&.active,
	&:hover {
		color: ${({ theme }) => theme.textColor.primary};
	}
`;
