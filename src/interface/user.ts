import { IPhoto } from "./common";
import { IRegisteredUser } from "./registration";

export enum UpdateUserKeys {
	name = "name",
	email = "email",
	city = "city",
	phone = "phone",
	birthday = "birthday",
}

export interface IUser extends IRegisteredUser {
	birthday?: Date;
	photo?: IPhoto;
}

export interface IUpdateUser {
	id: number;
	email?: string;
	name?: string;
	city?: string;
	phone?: string;
	birthday?: Date;
	photo?: IPhoto;
}

export interface IProfileState {
	name: string;
	email: string;
	city: string;
	phone: string;
	birthday: string;
	photo?: IPhoto;
}

export interface IErrorProfile {
	name?: string;
	email?: string;
	city?: string;
	phone?: string;
	birthday?: string;
}
