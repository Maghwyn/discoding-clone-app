import { defineStore } from 'pinia';

import { pick } from '@/utils/object.helper';
import type { KeysRequired } from '@/interfaces/advanced-types.interface';
import type { MessagesStore } from '@/interfaces/messages.interface';

const messagesStoreDefaultState = (): MessagesStore => ({
	lastEditId: null,
	messages: []
});

export const useMessagesStore = defineStore('messages', {
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
