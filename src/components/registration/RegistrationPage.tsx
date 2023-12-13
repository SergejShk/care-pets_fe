import styled from "styled-components";

const RegistrationPage = () => {
	return (
		<RegistrationStyled>
			<Title>Registration</Title>
		</RegistrationStyled>
	);
};

export default RegistrationPage;

const RegistrationStyled = styled.div`
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

const Title = styled.h2`
	display: block;
	font-size: 24px;
	font-weight: 700;
	line-height: normal;
	letter-spacing: 0.96px;
	margin: 42px 0 40px;
	text-align: center;
`;
