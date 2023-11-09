<script lang="ts" setup>
import { onMounted } from 'vue';

import SideMenu from '@/layouts/side-menu/SideMenu.vue';
import { retrieveDirectMessages } from '@/api/conversations.req';
import { useDirectMessagesStore } from '@/stores/direct-messages.store';
import { RelationType } from '../api/relationship.req.type';
import { retrieveRelationList } from '@/api/relationship.req';
import { useRelationshipStore } from '@/stores/relationship.store';

const relationshipStore = useRelationshipStore();
const directMessagesStore = useDirectMessagesStore();

onMounted(async () => {
	try {
		const res = await retrieveDirectMessages();
		directMessagesStore.channels = res.data || [];
	} catch(err) {
		console.log(err);
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
})
</script>

<template>
	<SideMenu />
	<div id="content" class="ml-[70px]">
		<router-view />
	</div>
</template>