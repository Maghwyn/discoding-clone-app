import { defineStore } from 'pinia';

import { pick } from '@/utils/object.helper';
import type { KeysRequired } from '@/interfaces/advanced-types.interface';
import type { MessagesStore } from '@/interfaces/message.interface';

const messagesStoreDefaultState = (): MessagesStore => ({
	lastEditId: null,
});

export const useMessagesStore = defineStore('auth', {
	state: (): MessagesStore => messagesStoreDefaultState(),
	actions: {
		reset(this: MessagesStore, keys?: Array<KeysRequired<MessagesStore>>) {
			Object.assign(
				this,
				keys?.length ? pick(messagesStoreDefaultState(), keys) : messagesStoreDefaultState(), // if no keys provided, reset all
			);
		},
	},
});
