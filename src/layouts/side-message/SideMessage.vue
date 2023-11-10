<script lang="ts" setup>
import { computed } from 'vue';

import SideMessageItem from '@/layouts/side-message/SideMessageItem.vue';
import { useMessagesStore } from '@/stores/messages.store';

const messagesStore = useMessagesStore();
const searchMsgList = computed(() => messagesStore.searchResult);
</script>

<template>
	<div class="flex flex-col w-[300px] min-w-[300px] overflow-hidden">
		<div class="hover-scrollbar py-2 px-2 bg-midground flex grow flex-col w-full justify-start items-center overflow-scroll">
			<ul v-if="searchMsgList.length > 0" class="flex flex-col h-full w-full gap-2 pb-[1.5rem]">
				<SideMessageItem
					v-for="(message, index) in searchMsgList"
					:user-picture="message.userPicture"
					:username="message.username"
					:content="message.content"
					:is-edited="message.isEdited"
					:created-at="message.createdAt"
					:key="`search_msg_${index}`"
				/>
			</ul>
			<div v-else class="w-full flex items-start justify-center pt-4 flex flex-col justify-center items-center gap-2">
				<img src="/search.svg" class="grayscale" width="200" height="200">
				<p class="text-gray-400 text-[15px]">No message found !</p>
			</div>
		</div>
	</div>
</template>

<style>
.search-header-shadow {
	box-shadow: 0 1px 0 hsla(0, 0%, 0.8%, 0.2), 0 1.5px 0 hsla(240, 7.7%, 2.5%, 0.05), 0 2px 0 hsla(0, 0%, 0.8%, 0.05);
}
</style>