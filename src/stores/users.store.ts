import { defineStore } from 'pinia';

import type { KeysRequired } from '@/interfaces/advanced-types.interface';
import type { UsersStore } from '@/interfaces/users.interface';
import type { User } from '@/api/users.req.type';
import { pick } from '@/utils/object.helper';

const usersStoreDefaultState = (): UsersStore => ({
	user: {} as User,
});

export const useUsersStore = defineStore('users', {
	state: (): UsersStore => usersStoreDefaultState(),
	actions: {
		reset(this: UsersStore, keys?: Array<KeysRequired<UsersStore>>) {
			Object.assign(
				this,
				keys?.length ? pick(usersStoreDefaultState(), keys) : usersStoreDefaultState(), // if no keys provided, reset all
			);
		},
	},
});
