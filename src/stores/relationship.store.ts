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
		filteredFriends(this: RelationshipStore) {
			if (this.friendUsernameFilter === "") return this.friends;
			return this.friends.filter((c) => c.username.includes(this.friendUsernameFilter));
		},
		filteredBlocked(this: RelationshipStore) {
			if (this.blockedUsernameFilter === "") return this.blocked;
			return this.blocked.filter((c) => c.username.includes(this.blockedUsernameFilter));
		},
		reset(this: RelationshipStore, keys?: Array<KeysRequired<RelationshipStore>>) {
			Object.assign(
				this,
				keys?.length ? pick(relationshipStoreDefaultState(), keys) : relationshipStoreDefaultState(), // if no keys provided, reset all
			);
		},
	},
});
