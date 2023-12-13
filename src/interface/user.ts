import { IRegisteredUser } from "./registration";

export interface IUser extends IRegisteredUser {
	birthday?: string;
	photo?: string;
}
