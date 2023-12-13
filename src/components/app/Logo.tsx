import { Link } from "react-router-dom";
import styled from "styled-components";

import { useModalContext } from "../../context/ModalProvider";

const Logo = () => {
	const { setModal } = useModalContext();

	const onLinkClick = () => {
		setModal((prev) => ({ ...prev, isMobileMenuOpen: false }));
	};

	return (
		<LogoStyled to="/" onClick={onLinkClick}>
			pe<AccentedLetter>t</AccentedLetter>ly
		</LogoStyled>
	);
};

export default Logo;

const LogoStyled = styled(Link)`
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
