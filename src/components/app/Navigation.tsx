import styled from "styled-components";

const navItems = [{ name: "News" }, { name: "Find pet" }, { name: "Our friend" }];

const Navigation = () => {
	return (
		<NavigationStyled>
			{navItems.map((item) => (
				<li key={item.name}>{item.name}</li>
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
