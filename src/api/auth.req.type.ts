export type ActionToken = {
	token: string;
}

export type UserEmail = {
	email: string;
}

export type UserPassword = {
	password: string;
}

export type Credentials = UserEmail & UserPassword;
export type PasswordChangePayload = ActionToken & UserPassword;

export type SignupPayload = Credentials & {
	username: string;
}