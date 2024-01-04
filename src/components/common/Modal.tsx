import { FC, ReactNode, useEffect } from "react";
import styled from "styled-components";

import CloseIcon from "./icons/Close";

interface IProps {
	children: ReactNode;
	onModalClose: () => void;
}

const Modal: FC<IProps> = ({ children, onModalClose }) => {
	useEffect(() => {
		const body = document.querySelector("body");
		if (!body) return;

		body.style.overflow = "hidden";

		window.addEventListener("keydown", onClicEscape);
		return () => {
			const body = document.querySelector("body");
			if (!body) return;

			body.style.overflow = "auto";

			window.removeEventListener("keydown", onClicEscape);
		};
	});

	const onBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
		e.target === e.currentTarget && onModalClose();
	};

	const onClicEscape = (e: KeyboardEvent) => {
		if (e.code === "Escape") {
			onModalClose();
		}
	};

	return (
		<Backdrop onClick={onBackdropClick}>
			<ModalWrapper onClick={onBackdropClick}>
				<ModalStyled>
					<CloseBtn type="button" onClick={onModalClose}>
						<CloseIcon />
					</CloseBtn>

					{children}
				</ModalStyled>
			</ModalWrapper>
		</Backdrop>
	);
};

export default Modal;

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.backgroundColor.backdrop};
	backdrop-filter: blur(10px);
	z-index: 100;
	overflow: auto;
`;

const ModalWrapper = styled.div`
	position: absolute;
	top: 50px;
	left: 50%;
	transform: translateX(-50%);
	min-width: 280px;
	min-height: 100px;
	padding-bottom: 50px;

	@media screen and (min-width: 768px) {
		min-width: 608px;
	}
`;

const ModalStyled = styled.div`
	background-color: ${({ theme }) => theme.backgroundColor.white};
	border-radius: 20px;
`;

const CloseBtn = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 34px;
	height: 34px;
	background-color: ${({ theme }) => theme.backgroundColor.main};
	border: none;
	border-radius: 50%;
	padding: 9px;

	@media screen and (min-width: 768px) {
		top: 12px;
		width: 44px;
		height: 44px;
		padding: 12px;
	}
`;
