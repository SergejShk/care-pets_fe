import { IRegisteredUser } from "./registration";

export interface IUser extends IRegisteredUser {
	birthday?: Date;
	photo?: string;
}
