import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import Heading from "./Heading";
import ProfileCard from "./ProfileCard";
import PetsCard from "./PetsCard";
import MobileMenu from "../mobile-menu/MobileMenu";
import AddPet from "./add-pet/AddPet";

import { useAuthContext } from "../../context/AuthProvider";

const fakePets = [
	{
		name: "Jack",
		birthday: "22.04.2018",
		breed: "Scotland",
		comments:
			"Comments: Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
		photo: "/cat.jpg",
	},
	{
		name: "Leon",
		birthday: "15.09.2022",
		breed: "Buldog",
		comments:
			"Comments: Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur   Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur  Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur   Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
		photo: "/dog.jpg",
	},
	{
		name: "Shvarz",
		birthday: "15.11.2023",
		breed: "Pitbull",
		comments: "Comments: Lorem ipsum dolor sit amet",
	},
];

const AccountPage: FC = () => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
	const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
	const navigate = useNavigate();

	const [isOpenAddPetModal, setIsOpenAddPetModal] = useState(false);

	const { auth } = useAuthContext();
	const isAuth = !!auth.email;

	useEffect(() => {
		if (!isAuth) {
			navigate("/");
		}
	}, [isAuth, navigate]);

	const handleAddPetModalOpen = () => setIsOpenAddPetModal(true);
	const handleAddPetModalClose = () => setIsOpenAddPetModal(false);

	return (
		<>
			<AccountStyled>
				<HeadingWrapper>
					<Heading
						title="My information:"
						isMainHeading
						hasAddBtn={!isMobile && !isDesktop}
						maxWidth={isDesktop ? "426px" : ""}
						onAddPetModalOpen={handleAddPetModalOpen}
					/>
					{isDesktop && (
						<Heading
							title="My pets:"
							hasAddBtn={isMobile || isDesktop}
							onAddPetModalOpen={handleAddPetModalOpen}
						/>
					)}
				</HeadingWrapper>

				<CardsWrapper>
					<ProfileCard user={auth} />
					{!isDesktop && (
						<Heading
							title="My pets:"
							hasAddBtn={isMobile || isDesktop}
							onAddPetModalOpen={handleAddPetModalOpen}
						/>
					)}

					<PetsList>
						{fakePets.map((pet, idx) => (
							<PetsCard key={idx} pet={pet} />
						))}
					</PetsList>
				</CardsWrapper>

				{!isDesktop && <MobileMenu />}
			</AccountStyled>

			{isOpenAddPetModal && <AddPet onClose={handleAddPetModalClose} />}
		</>
	);
};

export default AccountPage;

const AccountStyled = styled.div`
	position: relative;
	max-width: 320px;
	min-height: calc(100vh - 60px - 61px);
	margin: 0 auto;
	overflow: hidden;
	padding: 61px 0 80px;

	@media screen and (min-width: 768px) {
		min-height: calc(100vh - 72px - 88px);
		max-width: 768px;
		padding: 88px 0 100px;
	}
	@media screen and (min-width: 1280px) {
		min-height: calc(100vh - 68px - 58px);
		max-width: 1280px;
		padding: 58px 0 40px;
	}
`;

const HeadingWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const CardsWrapper = styled.div`
	@media screen and (min-width: 1280px) {
		display: flex;
		align-items: flex-start;
		gap: 25px;
	}
`;

const PetsList = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;

	@media screen and (min-width: 1280px) {
		gap: 22px;
	}
`;
