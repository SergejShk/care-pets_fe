import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import MobileMenu from "../mobile-menu/MobileMenu";
import FirstStepRegistration from "./FirstStepRegistration";
import SecondStepRegistration from "./SecondStepRegistration";

import { IFirstStepRegistration } from "../../interface/registration";

const RegistrationPage = () => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

	const [dataFirstStep, setDataFirstStep] = useState<IFirstStepRegistration | null>(null);

	return (
		<RegistrationStyled>
			<FormContainer>
				<Title>Registration</Title>

				{!dataFirstStep && <FirstStepRegistration setDataFirstStep={setDataFirstStep} />}
				{dataFirstStep && <SecondStepRegistration firstStepValues={dataFirstStep} />}

				<AdditionalText>
					Already have an account? <LinkStyled to="/login">Login</LinkStyled>
				</AdditionalText>
			</FormContainer>
			{!isDesktop && <MobileMenu />}
		</RegistrationStyled>
	);
};

export default RegistrationPage;

const RegistrationStyled = styled.div`
	position: relative;
	max-width: 320px;
	min-height: calc(100vh - 60px - 84px);
	margin: 0 auto;
	padding: 42px 20px;
	overflow: hidden;
	background-image: url("/wave-common-mob.png");
	background-size: auto;
	background-position: center bottom;
	background-repeat: no-repeat;

	@media screen and (min-width: 768px) {
		max-width: 768px;
		min-height: calc(100vh - 60px - 169px - 169px);
		padding: 169px 32px;
		background-image: url("/wave-common-tab.png");
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		min-height: calc(100vh - 64px - 54px);
		padding: 46px 16px 0;
		background-image: url("/wave-common-desk.png");
	}
`;

const Title = styled.h2`
	display: block;
	font-size: 24px;
	font-weight: 700;
	line-height: normal;
	letter-spacing: 0.96px;
	color: ${({ theme }) => theme.textColor.black};
	margin: 0 0 40px;
	text-align: center;

	@media screen and (min-width: 768px) {
		font-size: 36px;
		font-weight: 500;
		letter-spacing: 1.44px;
	}
`;

const FormContainer = styled.div`
	background-color: transparent;
	margin: 0 auto 0;

	@media screen and (min-width: 768px) {
		width: calc(608px - 160px);
		border-radius: 40px;
		box-shadow: 7px 4px 14px 0px rgba(0, 0, 0, 0.11);
		background-color: ${({ theme }) => theme.backgroundColor.white};
		padding: 60px 80px 40px;
		margin: 0 auto;
	}

	@media screen and (min-width: 1280px) {
		width: calc(618px - 160px);
		padding: 60px 80px 60px;
	}
`;

const AdditionalText = styled.p`
	text-align: center;
	font-size: 12px;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.48px;
	color: ${({ theme }) => theme.textColor.black};
	margin: 40px 0 0;
`;

const LinkStyled = styled(Link)`
	color: ${({ theme }) => theme.textColor.blue};
	text-decoration: underline;
`;
