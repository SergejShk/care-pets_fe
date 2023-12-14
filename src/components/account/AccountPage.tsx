import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import LogOutBtn from "./LogOutBtn";
import MobileMenu from "../mobile-menu/MobileMenu";

import { useAuthContext } from "../../context/AuthProvider";

const AccountPage: FC = () => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
	const navigate = useNavigate();

	const { auth } = useAuthContext();
	const isAuth = !!auth.email;

	useEffect(() => {
		if (!isAuth) {
			navigate("/");
		}
	}, [isAuth, navigate]);

	return (
		<AccountStyled>
			Account page
			<LogOutBtn />
			{!isDesktop && <MobileMenu />}
		</AccountStyled>
	);
};

export default AccountPage;

const AccountStyled = styled.div`
	position: relative;
	max-width: 320px;
	min-height: calc(100vh - 60px);
	margin: 0 auto;
	padding: 0 20px;
	overflow: hidden;

	@media screen and (min-width: 768px) {
		max-width: 768px;
		padding: 0 32px;
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		padding: 0 16px;
	}
`;
