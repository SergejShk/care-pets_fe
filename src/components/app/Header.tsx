import styled from "styled-components";

import Logo from "./Logo";

const Header = () => {
	return (
		<HeaderStyled>
			<Logo />
		</HeaderStyled>
	);
};

export default Header;

const HeaderStyled = styled.div`
	display: flex;
	align-items: center;
	padding: 16px 20px;
`;
