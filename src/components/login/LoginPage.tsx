import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import MobileMenu from "../mobile-menu/MobileMenu";

import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";

import { useLogin } from "../../api/mutations/auth/useLogin";

import { ILoginFormValues } from "../../interface/login";
import { ButtonTheme } from "../../interface/styles";

const LoginPage: FC = () => {
	const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
	const navigate = useNavigate();

	const { data, isPending, error, mutate, reset } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginFormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (!data) return;

		reset();
		navigate("/account");
	}, [data, navigate, reset]);

	const onSubmit = (formValues: ILoginFormValues) => {
		mutate({ body: formValues });
	};

	return (
		<LoginStyled>
			<FormContainer>
				<Title>Login</Title>

				<FormStyled className="form" onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="text"
						name="email"
						placeholder="Email"
						register={register}
						rules={{
							required: { value: true, message: "Required" },
							pattern: {
								value:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "Please enter a valid email",
							},
						}}
						error={errors.email}
					/>

					<Input
						type="password"
						name="password"
						placeholder="Password"
						register={register}
						rules={{
							required: { value: true, message: "Required" },
							minLength: { value: 7, message: "Min length 7 characters" },
							maxLength: { value: 32, message: "Max length 32 characters" },
						}}
						error={errors.password}
					/>

					<Button btntheme={ButtonTheme.Orange} style={{ marginTop: "24px" }} disabled={isPending}>
						Login
						{!!error && <ErrorMessage message={error.message} />}
					</Button>
				</FormStyled>

				<AdditionalText>
					Already have an account? <LinkStyled to="/registration">Register</LinkStyled>
				</AdditionalText>
			</FormContainer>
			{!isDesktop && <MobileMenu />}
		</LoginStyled>
	);
};

export default LoginPage;

const LoginStyled = styled.div`
	position: relative;
	max-width: 320px;
	min-height: calc(100vh - 60px - 84px);
	margin: 0 auto;
	padding: 42px 20px;
	overflow: hidden;
	background-image: url("/wave-common-mob.png");
	background-size: auto;
	background-position: center bottom;
	background-repeat: no-repeat;

	@media screen and (min-width: 768px) {
		max-width: 768px;
		min-height: calc(100vh - 60px - 169px - 169px);
		padding: 169px 32px;
		background-image: url("/wave-common-tab.png");
	}
	@media screen and (min-width: 1280px) {
		max-width: 1280px;
		min-height: calc(100vh - 64px - 54px);
		padding: 46px 16px 0;
		background-image: url("/wave-common-desk.png");
	}
`;

const Title = styled.h2`
	display: block;
	font-size: 24px;
	font-weight: 700;
	line-height: normal;
	letter-spacing: 0.96px;
	color: ${({ theme }) => theme.textColor.black};
	margin: 0 0 40px;
	text-align: center;

	@media screen and (min-width: 768px) {
		font-size: 36px;
		font-weight: 500;
		letter-spacing: 1.44px;
	}
`;

const FormContainer = styled.div`
	background-color: transparent;
	margin: 0 auto 0;

	@media screen and (min-width: 768px) {
		width: calc(608px - 160px);
		border-radius: 40px;
		box-shadow: 7px 4px 14px 0px rgba(0, 0, 0, 0.11);
		background-color: ${({ theme }) => theme.backgroundColor.white};
		padding: 60px 80px 40px;
		margin: 0 auto;
	}

	@media screen and (min-width: 1280px) {
		width: calc(618px - 160px);
		padding: 60px 80px 60px;
	}
`;

const AdditionalText = styled.p`
	text-align: center;
	font-size: 12px;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0.48px;
	color: ${({ theme }) => theme.textColor.black};
	margin: 40px 0 0;
`;

const LinkStyled = styled(Link)`
	color: ${({ theme }) => theme.textColor.blue};
	text-decoration: underline;
`;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
