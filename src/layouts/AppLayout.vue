<script lang="ts" setup>
import { onMounted } from 'vue';

import SideMenu from '@/layouts/side-menu/SideMenu.vue';
import { retrieveDirectMessages } from '@/api/conversations.req';
import { useDirectMessagesStore } from '@/stores/direct-messages.store';
import { RelationType } from '@/api/relationship.req.type';
import { retrieveRelationList } from '@/api/relationship.req';
import { useRelationshipStore } from '@/stores/relationship.store';
import { useMessagesSocket } from '@/composables/useSocketMessage';
import { handleSocketMessagesEvents } from '@/api/messages.socket';
import { retrieveUser } from '@/api/users.req';
import { useUsersStore } from '@/stores/users.store';
import type { User } from '@/api/users.req.type';
import { useMessagesStore } from '@/stores/messages.store';
import { retrieveUnreadsMessage } from '@/api/messages.req';

const socket = useMessagesSocket();
handleSocketMessagesEvents(socket);

const usersStore = useUsersStore()
const messagesStore = useMessagesStore();
const relationshipStore = useRelationshipStore();
const directMessagesStore = useDirectMessagesStore();

onMounted(async () => {
	try {
		const res = await retrieveUser();
		usersStore.user = res.data || {} as User;
	} catch(err) {
		console.error(err);
	}

	try {
		const res = await retrieveDirectMessages();
		directMessagesStore.channels = res.data || [];
	} catch(err) {
		console.error(err);
	}

	try {
		const res = await retrieveRelationList(RelationType.FRIEND);
		relationshipStore.friends = res.data || [];
	} catch(err) {
		console.error(err);
	}

	try {
		const res = await retrieveRelationList(RelationType.BLOCKED);
		relationshipStore.blocked = res.data || [];
	} catch(err) {
		console.error(err);
	}

	try {
		const res = await retrieveUnreadsMessage();
		messagesStore.unreads = res.data || [];
	} catch(err) {
		console.error(err);
	}
})
</script>

<template>
	<SideMenu />
	<div id="content" class="ml-[70px]">
		<router-view />
	</div>
</template>