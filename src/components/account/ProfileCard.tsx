import { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import PhotoCamera from "../common/icons/PhotoCamera";

import LogOutBtn from "./LogOutBtn";

import { updateProfileApi } from "../../api/services/profile/updateProfile";
import { useGetMe } from "../../api/mutations/auth/useGetMe";

import { IErrorProfile, IProfileState, IUser, UpdateUserKeys } from "../../interface/user";
import { profileShema } from "../../validation/profile";

interface IProps {
	user: IUser;
}

const initialState = {
	name: "",
	email: "",
	city: "",
	phone: "",
	birthday: undefined,
};

const ProfileCard: FC<IProps> = ({ user }) => {
	const { id: userId, name, email, city, phone, birthday } = user;

	const [userState, setUserState] = useState<IProfileState>(initialState);
	const [activeInputId, setActiveInputId] = useState<string | null>(null);
	const [error, setError] = useState<IErrorProfile | null>(null);

	const { mutate: updateCurrentUser } = useGetMe();

	const listRef = useRef<HTMLUListElement | null>(null);
	const inputNameRef = useRef<HTMLInputElement | null>(null);
	const inputEmailRef = useRef<HTMLInputElement | null>(null);
	const inputCityRef = useRef<HTMLInputElement | null>(null);
	const inputPhoneRef = useRef<HTMLInputElement | null>(null);

	const date = user?.birthday ? new Date(user?.birthday).toLocaleDateString() : "";

	const setInitialState = useCallback(
		() =>
			setUserState({
				name,
				email,
				city,
				phone,
				birthday,
			}),
		[birthday, city, email, name, phone]
	);

	const onInputBlur = useCallback(
		(e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (target.id == activeInputId) return;

			setActiveInputId(null);
			setInitialState();
			setError(null);
		},
		[activeInputId, setInitialState]
	);

	useEffect(() => {
		setInitialState();
	}, [setInitialState]);

	useEffect(() => {
		document.body.addEventListener("mousedown", onInputBlur, true);

		return () => {
			document.body.removeEventListener("mousedown", onInputBlur, true);
		};
	}, [onInputBlur]);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setError(null);
		setUserState((prev) => ({ ...prev, [name]: value }));
	};

	const onInputFocus = (id: string) => {
		if (!listRef.current) return;
		const itemId = "item-" + id;

		const listItems = Object.values(listRef.current.children);
		const item = listItems.find((item) => item.id === itemId);

		if (!item) return;

		const input = item.children[1] as HTMLInputElement;
		input.disabled = false;
		input.focus();
	};

	const onClickEditBtn = async (e: React.MouseEvent<HTMLElement>) => {
		const id = e.currentTarget.id as UpdateUserKeys;

		if (activeInputId === id && userState[id] !== user[id]) {
			const validatedValue = profileShema[id].safeParse(userState[id]);

			if (!validatedValue.success) {
				setError({ [id]: validatedValue.error.issues[0].message });
				return;
			}

			await updateProfileApi({ id: userId, [id]: validatedValue.data });

			updateCurrentUser();
			setActiveInputId(null);
			setError(null);
			return;
		}

		if (activeInputId !== id) {
			setInitialState();
			setActiveInputId(id);
			onInputFocus(id);
		}
	};

	return (
		<ProfileCardStyled>
			<PhotoBlock>
				<Avatar src={user?.photo || "/avatar.png"} alt="user avatar" />
				<EditPhotoBtn>
					<PhotoCamera />
					Edit photo
				</EditPhotoBtn>
			</PhotoBlock>

			<InfoBlock>
				<InfoList ref={listRef}>
					<InfoItem id="item-name">
						<InfoTitle>Name: </InfoTitle>
						<InputWrapper>
							<InputProfile
								ref={inputNameRef}
								id="name"
								name="name"
								type="text"
								autoComplete="off"
								value={userState.name}
								onChange={onInputChange}
								disabled={activeInputId !== "name"}
							/>
							{error?.name && <ErrorText role="alert">{error?.name}</ErrorText>}
						</InputWrapper>
						<EditInfoBtn id="name" $isActive={activeInputId === "name"} onClick={onClickEditBtn} />
					</InfoItem>

					<InfoItem id="item-email">
						<InfoTitle>Email: </InfoTitle>
						<InputWrapper>
							<InputProfile
								ref={inputEmailRef}
								id="email"
								name="email"
								type="email"
								autoComplete="off"
								value={userState.email}
								onChange={onInputChange}
								disabled={activeInputId !== "email"}
							/>
							{error?.email && <ErrorText role="alert">{error?.email}</ErrorText>}
						</InputWrapper>
						<EditInfoBtn id="email" $isActive={activeInputId === "email"} onClick={onClickEditBtn} />
					</InfoItem>

					<InfoItem id="item-birthday">
						<InfoTitle>Birthday: </InfoTitle>
						<InfoValueText>{date}</InfoValueText>
						<EditInfoBtn id="birthday" $isActive={activeInputId === "birthday"} onClick={onClickEditBtn} />
					</InfoItem>

					<InfoItem id="item-phone">
						<InfoTitle>Phone: </InfoTitle>
						<InputWrapper>
							<InputProfile
								ref={inputPhoneRef}
								id="phone"
								name="phone"
								type="text"
								autoComplete="off"
								value={userState.phone}
								onChange={onInputChange}
								disabled={activeInputId !== "phone"}
							/>
							{error?.phone && <ErrorText role="alert">{error?.phone}</ErrorText>}
						</InputWrapper>
						<EditInfoBtn id="phone" $isActive={activeInputId === "phone"} onClick={onClickEditBtn} />
					</InfoItem>

					<InfoItem id="item-city">
						<InfoTitle>City: </InfoTitle>
						<InputWrapper>
							<InputProfile
								ref={inputCityRef}
								id="city"
								name="city"
								type="text"
								autoComplete="off"
								value={userState.city}
								onChange={onInputChange}
								disabled={activeInputId !== "city"}
							/>
							{error?.city && <ErrorText role="alert">{error?.city}</ErrorText>}
						</InputWrapper>
						<EditInfoBtn id="city" $isActive={activeInputId === "city"} onClick={onClickEditBtn} />
					</InfoItem>
				</InfoList>
				<LogOutBtn />
			</InfoBlock>
		</ProfileCardStyled>
	);
};

export default ProfileCard;

const ProfileCardStyled = styled.div`
	width: calc(280px - 40px);
	display: flex;
	flex-direction: column;
	gap: 37px;
	margin: 0 auto;
	padding: 20px 12px 20px 16px;
	background-color: ${({ theme }) => theme.backgroundColor.white};
	border-radius: 20px;
	box-shadow: 7px 4px 14px 0px rgba(0, 0, 0, 0.11);

	@media screen and (min-width: 768px) {
		width: calc(736px - 72px);
		flex-direction: row-reverse;
		justify-content: space-between;
		gap: 52px;
		border-radius: 0px 40px 40px 0px;
		padding: 24px 40px 25px 32px;
		margin: 0;
	}

	@media screen and (min-width: 1280px) {
		width: calc(411px - 32px);
		padding: 20px 16px 42px;
		flex-direction: column;
		gap: 32px;
	}
`;

const PhotoBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 12px;

	@media screen and (min-width: 768px) {
		gap: 8px;
		width: 233px;
	}

	@media screen and (min-width: 1280px) {
		position: relative;
		flex-direction: row;
		gap: 0;
	}
`;

const Avatar = styled.img`
	display: block;
	width: 233px;
	height: 233px;
	border-radius: 50%;
	box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.11);
	margin: 0 auto;

	@media screen and (min-width: 1280px) {
		margin: 0 0 0 73px;
	}
`;

const EditPhotoBtn = styled.button`
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	line-height: 22px;
	letter-spacing: 0.48px;
	background-color: transparent;
	border: none;
	cursor: pointer;

	@media screen and (min-width: 1280px) {
		position: absolute;
		right: -150px;
		bottom: 0;
		margin: 0 0 0 -25px;
	}
`;

const InfoBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 42px;

	@media screen and (min-width: 768px) {
		width: calc(100% - 285px);
		padding: 20px 0 0;
		align-items: flex-start;
	}

	@media screen and (min-width: 1280px) {
		width: 100%;
		padding: 0;
	}
`;

const InfoList = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const InfoItem = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const InfoValueText = styled.p`
	width: 58%;
	font-size: 12px;
	line-height: normal;
	letter-spacing: 0.48px;
	padding: 0 5px 0 0;

	@media screen and (min-width: 768px) {
		font-size: 18px;
		width: 62%;
	}
`;

const EditInfoBtn = styled.button<{ $isActive: boolean }>`
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.backgroundColor.main};
	backdrop-filter: blur(2px);
	border: none;
	cursor: pointer;
	border-radius: 50%;
	padding: 0;
	background-image: ${({ $isActive }) =>
		$isActive ? 'url("/icons/check-mark.svg")' : 'url("/icons/pencil.svg")'};
	background-size: auto;
	background-position: center center;
	background-repeat: no-repeat;

	@media screen and (min-width: 768px) {
		width: 32px;
		height: 32px;
	}
`;

const InfoTitle = styled.h3`
	width: 25%;
	font-size: 12px;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 0.48px;

	@media screen and (min-width: 768px) {
		font-size: 18px;
	}
`;

const InputWrapper = styled.div`
	position: relative;
	width: 145px;

	@media screen and (min-width: 768px) {
		width: 216px;
	}
`;

const InputProfile = styled.input`
	width: calc(145px - 26px);
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.textColor.black};
	font-size: 12px;
	letter-spacing: 0.72px;
	padding: 4px 12px 3px;
	border-radius: 40px;
	border: 1px solid rgba(245, 146, 86, 0.5);
	background-color: ${({ theme }) => theme.backgroundColor.main};
	outline: none;

	&:disabled {
		background-color: transparent;
		border-color: transparent;
	}

	@media screen and (min-width: 768px) {
		font-size: 18px;
		width: calc(216px - 24px);
	}
`;

const ErrorText = styled.span`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: -15px;
	width: 100%;
	font-size: 10px;
	color: ${({ theme }) => theme.textColor.error};
`;
