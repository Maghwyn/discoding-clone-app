import { defineStore } from 'pinia';

import type { KeysRequired } from '@/interfaces/advanced-types.interface';
import type { AuthStore } from '@/interfaces/auth.interface';
import { pick } from '@/utils/object.helper';

const authStoreDefaultState = (): AuthStore => ({
	isAuth: false,
});

export const useAuthStore = defineStore('auth', {
	state: (): AuthStore => authStoreDefaultState(),
	actions: {
		reset(this: AuthStore, keys?: Array<KeysRequired<AuthStore>>) {
			Object.assign(
				this,
				keys?.length ? pick(authStoreDefaultState(), keys) : authStoreDefaultState(), // if no keys provided, reset all
			);
		},
	},
});
