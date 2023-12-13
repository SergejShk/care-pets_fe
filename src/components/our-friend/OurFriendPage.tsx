import styled from "styled-components";

const OurFriendPage = () => {
	return <OurFriendStyled>Our Friend page</OurFriendStyled>;
};

export default OurFriendPage;

const OurFriendStyled = styled.div`
	max-width: 320px;
	margin: 0 auto;
	padding: 0 20px;

	@media screen and (min-width: 768px) {
		max-width: 768px;
		padding: 0 32px;
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		padding: 0 16px;
	}
`;
