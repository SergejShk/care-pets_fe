type ValuePiece = Date | null;

export type TDateValue = ValuePiece | [ValuePiece, ValuePiece];

export interface IPhoto {
	originalKey: string;
	key: string;
}
