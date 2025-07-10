import { IUser } from "@/types/user";

export interface ISignUp {
	full_name: string;
	email: string;
	password: string;
	password_confirm: string;
}
export interface ILogin {
	email: string;
	password: string;
}
export interface IProfile {
	id: number;
	phone: string;
	address: string;
	avatar: string;
}
export interface IUserProfile {
    access_token: string
    user: IUser
    profile: IProfile
}