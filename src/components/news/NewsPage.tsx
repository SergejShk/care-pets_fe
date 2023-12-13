import styled from "styled-components";

const NewsPage = () => {
	return <NewsStyled>News page</NewsStyled>;
};

export default NewsPage;

const NewsStyled = styled.div`
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
