import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

type InputProps<TFormValues extends FieldValues> = {
	name: Path<TFormValues>;
	type: string;
	label?: string;
	placeholder: string;
	register?: UseFormRegister<TFormValues>;
	rules?: RegisterOptions;
	error?: FieldError;
};

const Input = <TFormValues extends FieldValues>({
	name,
	type,
	label,
	placeholder,
	register,
	rules,
	error,
}: InputProps<TFormValues>) => {
	const hasError = !!(error && error.message);

	return (
		<InputWrapper>
			<Label>
				{label && label}
				<InputStyled
					id={name}
					name={name}
					type={type}
					placeholder={placeholder}
					{...(register && register(name, rules))}
					aria-invalid={hasError ? "true" : "false"}
					autoComplete="off"
				/>
			</Label>
			{hasError && <ErrorText role="alert">{error.message}</ErrorText>}
		</InputWrapper>
	);
};

export default Input;

const InputWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	gap: 8px;
	font-size: 18px;
	font-weight: 500;
	line-height: 26.5px;
	color: ${({ theme }) => theme.textColor.black};
`;

const InputStyled = styled.input`
	border-radius: 40px;
	border: ${({ theme }) => `1px solid ${theme.borderColor.input}`};
	background-color: ${({ theme }) => theme.backgroundColor.main};
	font-size: 14px;
	line-height: normal;
	letter-spacing: 0.56px;
	color: ${({ theme }) => theme.textColor.black};
	outline: none;
	padding: 11px 14px;

	@media screen and (min-width: 768px) {
		font-size: 18px;
		padding: 15px 32px 14px;
		letter-spacing: 0.72px;
	}

	&:hover,
	&:focus {
		border: ${({ theme }) => `1px solid ${theme.borderColor.primaryAccent}`};
	}
`;

const ErrorText = styled.span`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: -15px;
	font-size: 10px;
	color: ${({ theme }) => theme.textColor.error};
`;
