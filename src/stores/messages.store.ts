import { defineStore } from 'pinia';

import { pick } from '@/utils/object.helper';
import type { KeysRequired } from '@/interfaces/advanced-types.interface';
import type { MessagesStore, UnreadMessageGroup } from '@/interfaces/messages.interface';

const messagesStoreDefaultState = (): MessagesStore => ({
	lastEditId: null,
	messages: [],
	unreads: [],
	searchResult: [],
});

export const useMessagesStore = defineStore('messages', {
	state: (): MessagesStore => messagesStoreDefaultState(),
	getters: {
		groupUnreadsByUsers(this: MessagesStore): Array<UnreadMessageGroup> {
			const ids = new Set(this.unreads.map((u) => u.channelId));
			const data = [];

			ids.forEach((id) => { 
				const msgs = this.unreads.filter((c) => c.channelId === id);
				const notificationCount = msgs.length;
				const msg = msgs[0];

				data.push({
					id: msg.userId,
					username: msg.username,
					channelId: msg.channelId,
					userPicture: msg.userPicture ?? undefined, 
					notificationCount: notificationCount
				});
			})
			return data
		},
	},
	actions: {
		removeAllUnreadsFrom(this: MessagesStore, channelId: string) {
			console.log("heys")
			this.unreads = this.unreads.filter((c) => c.channelId !== channelId);
		},
		reset(this: MessagesStore, keys?: Array<KeysRequired<MessagesStore>>) {
			Object.assign(
				this,
				keys?.length ? pick(messagesStoreDefaultState(), keys) : messagesStoreDefaultState(), // if no keys provided, reset all
			);
		},
	},
});
