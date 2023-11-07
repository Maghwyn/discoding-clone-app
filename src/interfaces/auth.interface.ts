export interface AuthStore {
	isAuth: boolean;

	signin?: (this: AuthStore, data: AuthCreds) => Promise<boolean> | Promise<undefined>;
	logout?: (this: AuthStore) => Promise<boolean> | Promise<undefined>;
}

export interface AuthCreds {
	cardId: string;
	password: string;
}