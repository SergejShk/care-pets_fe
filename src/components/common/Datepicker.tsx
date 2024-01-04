import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { FieldError } from "react-hook-form";
import Calendar from "react-calendar";
import styled from "styled-components";

import { TDateValue } from "../../interface/common";
import { IPosition } from "../../interface/styles";

interface IProps {
	id?: string;
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
	value: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	hasFocus?: boolean;
	error?: FieldError;
	inputStyle?: CSSProperties;
	positionCalendar?: IPosition;
	handleManualInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleChange: (value: TDateValue) => void;
	setActiveInputId?: (value: React.SetStateAction<string | null>) => void;
}

const Datepicker: FC<IProps> = ({
	id,
	inputRef,
	value,
	label,
	placeholder,
	disabled = false,
	hasFocus = false,
	error,
	inputStyle,
	positionCalendar,
	handleManualInputChange,
	handleChange,
	setActiveInputId,
}) => {
	const [isActive, setIsActive] = useState(false);
	const datePickerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const input = inputRef.current;
		if (!input) return;

		const listener = () => setIsActive(true);

		const clickListener = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const datePicker = datePickerRef.current;

			if (!datePicker) return;

			if (!datePicker.contains(target)) {
				setIsActive(false);
			}
		};

		input.addEventListener("focus", listener, true);
		document.body.addEventListener("mousedown", clickListener, true);

		return () => {
			input.removeEventListener("focus", listener, true);
			document.body.removeEventListener("mousedown", clickListener, true);
		};
	}, [inputRef]);

	const handleCalendarChange = (value: TDateValue) => {
		handleChange(value);

		if (setActiveInputId) {
			setActiveInputId(id || null);
		}
	};

	const handleDatePickerStyledClick = () => {
		if (setActiveInputId) {
			setActiveInputId(id || null);
		}
	};

	const hasError = !!(error && error.message);

	return (
		<DatepickerStyled ref={datePickerRef} onClick={handleDatePickerStyledClick}>
			<Label>
				{label && label}
				<Input
					id={id}
					ref={inputRef}
					type="text"
					value={value}
					onChange={handleManualInputChange}
					placeholder={placeholder}
					disabled={disabled}
					autoComplete="off"
					$hasFocus={hasFocus}
					aria-invalid={hasError ? "true" : "false"}
					style={inputStyle}
				/>
			</Label>
			{isActive && (
				<CalendarStyled
					locale="en-US"
					onChange={handleCalendarChange}
					onViewChange={handleDatePickerStyledClick}
					tileClassName="calendarTile"
					$positionCalendar={positionCalendar}
				/>
			)}

			{hasError && <ErrorText role="alert">{error.message}</ErrorText>}
		</DatepickerStyled>
	);
};

export default Datepicker;

const DatepickerStyled = styled.div`
	position: relative;
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

	@media screen and (min-width: 768px) {
		font-size: 24px;
		gap: 12px;
	}
`;

const Input = styled.input<{ $hasFocus?: boolean }>`
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

	&:hover,
	&:focus {
		border-color: ${({ theme, $hasFocus }) => $hasFocus && theme.borderColor.primaryAccent};
	}

	@media screen and (min-width: 768px) {
		font-size: 18px;
		width: calc(216px - 24px);
	}
`;

const CalendarStyled = styled(Calendar)<{ $positionCalendar?: IPosition }>`
	position: absolute;
	top: 105%;
	left: -50px;
	left: ${({ $positionCalendar }) => $positionCalendar?.left || "-50%"};
	z-index: 1;
	background-color: ${({ theme }) => theme.backgroundColor.main};
	border-radius: 8px;
	border: 1px solid rgba(245, 146, 86, 0.5);
	padding: 5px;
	color: ${({ theme }) => theme.textColor.primary};
	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (min-width: 768px) {
		left: 0;
	}

	& .react-calendar__navigation__label {
		background-color: transparent;
		color: ${({ theme }) => theme.textColor.primary};
		border: none;
		cursor: pointer;
	}

	& .react-calendar__navigation__label:hover,
	& .react-calendar__navigation__label:active {
		color: ${({ theme }) => theme.textColor.primaryAccent};
	}

	& .react-calendar__navigation__arrow {
		background-color: transparent;
		color: ${({ theme }) => theme.textColor.primary};
		border: none;
		cursor: pointer;
	}

	& .react-calendar__navigation__arrow:hover {
		color: ${({ theme }) => theme.textColor.primaryAccent};
	}

	& .react-calendar__month-view__weekdays {
		display: none !important;
	}

	& .calendarTile {
		width: 30px;
		height: 30px;
		background-color: transparent;
		color: ${({ theme }) => theme.textColor.primary};
		cursor: pointer;
		border-radius: 50%;
		border: none;
	}

	& .calendarTile:hover {
		background-color: ${({ theme }) => theme.backgroundColor.primary};
		color: ${({ theme }) => theme.textColor.white};
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
