import { defineStore } from 'pinia';

import { pick } from '@/utils/object.helper';
import type { KeysRequired } from '@/interfaces/advanced-types.interface';
import type { RelationshipStore } from '@/interfaces/relationship.interface';

const relationshipStoreDefaultState = (): RelationshipStore => ({
	friends: [],
	blocked: [],
	friendUsernameFilter: "",
	blockedUsernameFilter: "",
});

export const useRelationshipStore = defineStore('relationships', {
	state: (): RelationshipStore => relationshipStoreDefaultState(),
	actions: {
		filteredFriends(this: RelationshipStore, username?: string) {
			if (this.friendUsernameFilter === "" && username === "") return this.friends;
			return this.friends.filter((c) => c.username.includes(username || this.friendUsernameFilter));
		},
		filteredBlocked(this: RelationshipStore, username?: string) {
			if (this.blockedUsernameFilter === "" && username === "") return this.blocked;
			return this.blocked.filter((c) => c.username.includes(username || this.blockedUsernameFilter));
		},
		reset(this: RelationshipStore, keys?: Array<KeysRequired<RelationshipStore>>) {
			Object.assign(
				this,
				keys?.length ? pick(relationshipStoreDefaultState(), keys) : relationshipStoreDefaultState(), // if no keys provided, reset all
			);
		},
	},
});
