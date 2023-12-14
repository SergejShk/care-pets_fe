import { FC } from "react";
import styled from "styled-components";

import LogOut from "../common/icons/LogOut";

import { useLogOut } from "../../api/mutations/auth/useLogOut";

const LogOutBtn: FC = () => {
	const { mutate } = useLogOut();

	const onLogOutClick = () => {
		mutate();
	};

	return (
		<LogOutBtnStyled type="button" onClick={onLogOutClick}>
			<LogOut />
			Log Out
		</LogOutBtnStyled>
	);
};

export default LogOutBtn;

const LogOutBtnStyled = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	background-color: transparent;
	border: none;
	font-size: 16px;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.64px;
	color: ${({ theme }) => theme.textColor.grey};
`;
