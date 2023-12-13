import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import MobileMenu from "../mobile-menu/MobileMenu";

const HomePage: FC = () => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1279px)" });

	return (
		<HomeStyled>
			<HomeText>Take good care of your small pets</HomeText>
			<WomanImg>
				<WomanHeart />
			</WomanImg>

			{!isDesktop && <MobileMenu />}
		</HomeStyled>
	);
};

export default HomePage;

const HomeStyled = styled.div`
	position: relative;
	width: 100%;
	min-height: calc(100vh - 60px);
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	background-image: url("/wave-mob.png");
	background-size: auto;
	background-position: center bottom;
	background-repeat: no-repeat;
	overflow: hidden;

	@media screen and (min-width: 768px) {
		background-image: url("/wave-tab.png");
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		background-image: url("/wave-desk.png");
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: normal;
		gap: 52px;
		margin: 0 auto;
		min-height: calc(100vh - 70px);
	}
`;

const WomanImg = styled.div`
	width: 320px;
	height: 337px;
	margin: 0 auto;
	background-image: url("/woman-mob.png");
	background-size: auto;
	background-position: center bottom;
	background-repeat: no-repeat;

	@media screen and (min-width: 768px) {
		width: 699px;
		height: 733px;
		background-image: url("/woman-tab.png");
	}
	@media screen and (min-width: 1280px) {
		position: relative;
		width: 624px;
		height: 655px;
		background-image: url("/woman-desk.png");
	}
`;

const WomanHeart = styled.div`
	display: none;

	@media screen and (min-width: 1280px) {
		display: block;
		width: 624px;
		height: 655px;
		position: absolute;
		top: 0;
		left: 0;
		background-image: url("/woman-heart.png");
		background-size: auto;
		background-position: 56px 57px;
		background-repeat: no-repeat;
	}
`;

const HomeText = styled.p`
	display: block;
	width: 280px;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: 44px;
	color: ${({ theme }) => theme.textColor.black};
	margin: 60px auto 58px;

	@media screen and (min-width: 768px) {
		width: 588px;
		font-size: 68px;
		line-height: 100px;
		margin: 92px auto 100px;
	}
	@media screen and (min-width: 1280px) {
		width: 588px;
		font-size: 68px;
		line-height: 100px;
		margin: 92px 0 auto 16px;
	}
`;
