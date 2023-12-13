import { ButtonHTMLAttributes, CSSProperties, FC, ReactNode } from "react";
import styled from "styled-components";

import { ButtonTheme } from "../../interface/styles";

type IProps = {
	children: ReactNode;
	style?: CSSProperties;
	btntheme?: ButtonTheme;
	fontSize?: string;
	padding?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<IProps> = ({ children, btntheme = ButtonTheme.White, padding, fontSize, style }) => {
	return (
		<ButtonStyled btntheme={btntheme} padding={padding} fontSize={fontSize} style={style}>
			{children}
		</ButtonStyled>
	);
};

export default Button;

const ButtonStyled = styled.button<{ btntheme: ButtonTheme; padding?: string; fontSize?: string }>`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${({ fontSize }) => fontSize || "20px"};
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.8px;
	border-radius: 40px;
	border: ${({ theme }) => `2px solid ${theme.borderColor.primary}`};
	padding: ${({ padding }) => padding || "10px 28px"};
	color: ${({ theme, btntheme }) =>
		btntheme === ButtonTheme.Orange ? theme.backgroundColor.white : theme.backgroundColor.black};
	background-color: ${({ theme, btntheme }) =>
		btntheme === ButtonTheme.Orange ? theme.backgroundColor.primary : theme.backgroundColor.white};

	&:hover {
		border-color: ${({ theme }) => theme.borderColor.primaryAccent};
	}
`;
