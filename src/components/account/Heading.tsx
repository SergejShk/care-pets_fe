import { FC } from "react";
import styled from "styled-components";

import Plus from "../common/icons/Plus";

interface IProps {
	title: string;
	maxWidth?: string;
	hasAddBtn?: boolean;
	isMainHeading?: boolean;
}

const Heading: FC<IProps> = ({ title, maxWidth, hasAddBtn = false, isMainHeading = false }) => {
	return (
		<HeadingStyled $isMainHeading={isMainHeading} $maxWidth={maxWidth}>
			{title}

			{hasAddBtn && (
				<AddBtn type="button">
					Add pet
					<PlusWrapper>
						<Plus />
					</PlusWrapper>
				</AddBtn>
			)}
		</HeadingStyled>
	);
};

export default Heading;

const HeadingStyled = styled.div<{ $isMainHeading?: boolean; $maxWidth?: string }>`
	width: calc(100% - 40px);
	max-width: ${({ $maxWidth }) => $maxWidth};
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 20px;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.8px;
	padding: 0 20px;
	margin: ${({ $isMainHeading }) => ($isMainHeading ? "0 0 18px" : "47px 0 32px")};

	@media screen and (min-width: 768px) {
		width: calc(100% - 64px);
		font-size: 28px;
		padding: 0 32px;
		margin: ${({ $isMainHeading }) => ($isMainHeading ? "0 0 40px" : "20px 0 24px")};
		align-items: flex-start;
	}

	@media screen and (min-width: 1280px) {
		width: calc(100% - 17px);
		padding: ${({ $isMainHeading }) => ($isMainHeading ? "0 0 0 17px" : "0 17px 0 0")};
		margin: 0 0 24px;
	}
`;

const AddBtn = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15px;
	background-color: transparent;
	border: none;
	font-size: 20px;
	font-weight: 500;
	line-height: normal;
	color: ${({ theme }) => theme.textColor.black};
`;

const PlusWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.backgroundColor.primary};
`;
