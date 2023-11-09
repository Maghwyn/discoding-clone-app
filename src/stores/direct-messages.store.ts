import { defineStore } from 'pinia';

import { pick } from '@/utils/object.helper';
import type { KeysRequired } from '@/interfaces/advanced-types.interface';
import type { DirectMessagesStore } from '@/interfaces/direct-messages.interface';

const directMessagesStoreDefaultState = (): DirectMessagesStore => ({
	channels: [],
	active: 'default',
});

export const useDirectMessagesStore = defineStore('conversations', {
	state: (): DirectMessagesStore => directMessagesStoreDefaultState(),
	actions: {
		findById(this: DirectMessagesStore, channelId: string) {
			return this.channels.find((c) => c.id === channelId);
		},
		reset(this: DirectMessagesStore, keys?: Array<KeysRequired<DirectMessagesStore>>) {
			Object.assign(
				this,
				keys?.length ? pick(directMessagesStoreDefaultState(), keys) : directMessagesStoreDefaultState(), // if no keys provided, reset all
			);
		},
	},
});
