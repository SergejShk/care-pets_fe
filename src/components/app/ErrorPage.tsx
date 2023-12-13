import { useRouteError } from "react-router-dom";
import { styled } from "styled-components";

const ErrorPage = () => {
	const error = useRouteError() as Error;

	return (
		<ErrorPageStyled>
			Ooops!
			<p>{(error as { statusText?: string })?.statusText ?? error.message}</p>
		</ErrorPageStyled>
	);
};

export default ErrorPage;

const ErrorPageStyled = styled.div`
	background-color: ${({ theme }) => theme.backgroundColor.main};
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 32px;
	font-weight: 700;
`;
