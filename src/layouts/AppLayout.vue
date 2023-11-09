<script lang="ts" setup>
import { onMounted } from 'vue';

import SideMenu from '@/layouts/side-menu/SideMenu.vue';
import { retrieveDirectMessages } from '@/api/conversations.req';
import { useDirectMessagesStore } from '@/stores/direct-messages.store';

const directMessagesStore = useDirectMessagesStore();

onMounted(async () => {
	try {
		const res = await retrieveDirectMessages();
		directMessagesStore.channels = res.data || [];
	} catch(err) {
		console.log(err);
	}
})
</script>

<template>
	<SideMenu />
	<div id="content" class="ml-[70px]">
		<router-view />
	</div>
</template>