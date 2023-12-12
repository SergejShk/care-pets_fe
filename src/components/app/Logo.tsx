import styled from "styled-components";

const Logo = () => {
	return (
		<LogoStyled>
			pe<AccentedLetter>t</AccentedLetter>ly
		</LogoStyled>
	);
};

export default Logo;

const LogoStyled = styled.div`
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.textColor.black};
	font-family: Poppins;
	font-size: 32px;
	font-weight: 700;
`;

const AccentedLetter = styled.span`
	color: ${({ theme }) => theme.textColor.primary};
`;
