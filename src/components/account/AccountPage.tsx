import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import Heading from "./Heading";
import ProfileCard from "./ProfileCard";
import PetsCard from "./PetsCard";
import MobileMenu from "../mobile-menu/MobileMenu";

import { useAuthContext } from "../../context/AuthProvider";

const AccountPage: FC = () => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
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
			<HeadingWrapper>
				<Heading title="My information:" isMainHeading hasAddBtn={!isMobile && !isDesktop} />
				{isDesktop && <Heading title="My pets:" hasAddBtn={isMobile || isDesktop} />}
			</HeadingWrapper>

			<ProfileCard />

			{!isDesktop && <Heading title="My pets:" hasAddBtn={isMobile || isDesktop} />}

			<PetsCard />

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
	overflow: hidden;
	padding: 61px 0 0;

	@media screen and (min-width: 768px) {
		max-width: 768px;
		padding: 88px 0 0;
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		padding: 58px 0 0;
	}
`;

const HeadingWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
