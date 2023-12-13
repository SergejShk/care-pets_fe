import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "../app/Header";

const SharedLayout: FC = () => {
	return (
		<LayoutStyled>
			<Header />

			<Suspense>
				<Outlet />
			</Suspense>
		</LayoutStyled>
	);
};

export default SharedLayout;

const LayoutStyled = styled.div`
	min-height: 100vh;
	position: relative;
	height: 100%;
	margin: 0 auto;
	background-color: ${({ theme }) => theme.backgroundColor.main};
`;
