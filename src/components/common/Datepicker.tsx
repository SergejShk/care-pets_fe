import { FC, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";

import { TDateValue } from "../../interface/common";

interface IProps {
	id?: string;
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
	value: string;
	disabled?: boolean;
	handleManualInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleChange: (value: TDateValue) => void;
	setActiveInputId: (value: React.SetStateAction<string | null>) => void;
}

const Datepicker: FC<IProps> = ({
	id,
	inputRef,
	value,
	disabled = false,
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
		setActiveInputId(id || null);
	};

	return (
		<DatepickerStyled ref={datePickerRef} onClick={() => setActiveInputId(id || null)}>
			<Input
				id={id}
				ref={inputRef}
				type="text"
				value={value}
				onChange={handleManualInputChange}
				disabled={disabled}
				autoComplete="false"
			/>
			{isActive && (
				<CalendarStyled
					locale="en-US"
					onChange={handleCalendarChange}
					onViewChange={() => setActiveInputId(id || null)}
					tileClassName="calendarTile"
				/>
			)}
		</DatepickerStyled>
	);
};

export default Datepicker;

const DatepickerStyled = styled.div`
	position: relative;
`;

const Input = styled.input`
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

const CalendarStyled = styled(Calendar)`
	position: absolute;
	top: 105%;
	left: -50px;
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
