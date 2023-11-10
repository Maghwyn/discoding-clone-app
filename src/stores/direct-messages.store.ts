import { defineStore } from 'pinia';

import { pick } from '@/utils/object.helper';
import type { KeysRequired } from '@/interfaces/advanced-types.interface';
import type { DirectMessagesStore } from '@/interfaces/direct-messages.interface';
import type { DirectMessages } from '@/api/conversations.req.type';

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
		addChannel(this: DirectMessagesStore, directMessage: DirectMessages) {
			const id = this.channels.findIndex((c) => c.id === directMessage.id);
			if (id === -1) {
				this.channels.unshift(directMessage);
			}
		},
		retrieveChannelsId(this: DirectMessagesStore) {
			return this.channels.map((c) => c.id);
		},
		reset(this: DirectMessagesStore, keys?: Array<KeysRequired<DirectMessagesStore>>) {
			Object.assign(
				this,
				keys?.length ? pick(directMessagesStoreDefaultState(), keys) : directMessagesStoreDefaultState(), // if no keys provided, reset all
			);
		},
	},
});
