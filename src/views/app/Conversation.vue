<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import SideConversation from '@/layouts/side-conversation/SideConversation.vue';
import Message from '@/components/channel/Message.vue';
import ChannelHeader from '@/components/channel/ChannelHeader.vue';
import MessageOrigin from '@/components/channel/MessageOrigin.vue';
import MessageInput from '@/components/channel/MessageInput.vue';
import { retrieveChannelMessages } from '@/api/messages.req';
import { useMessagesStore } from '@/stores/messages.store';
import { MessageContext } from '@/api/messages.req.type';
import { useDirectMessagesStore } from '@/stores/direct-messages.store';

const route = useRoute();
const directMessagesStore = useDirectMessagesStore();
const messageStore = useMessagesStore();
const channelId = route.params.id as string;
const directMessage = directMessagesStore.findById(channelId);
const messages = computed(() => messageStore.messages);
const isBlocked = computed(() => messages.value.some((m) => m.isBlocked));

onMounted(async () => {
	try {
		const res = await retrieveChannelMessages(channelId, MessageContext.CONVERSATION);
		messageStore.messages = res.data || [];
	} catch(err) {
		console.error(err);
	}
})

const isFollowup = (index: number) => {
	if (index > 0) {
		const currentMessage = messages.value[index];
		const previousMessage = messages.value[index - 1];
		const currentTime = +new Date(currentMessage.createdAt);
		const previousTime = +new Date(previousMessage.createdAt);
		const isSameUser = currentMessage.username === previousMessage.username;
		const timeDifference = (currentTime - previousTime) / (1000 * 60);
		return isSameUser && timeDifference <= 5;
	}
	return false;
}
</script>

<template>
	<SideConversation/>
	<div class="flex grow flex-col h-full relative">
		<ChannelHeader
			:user-picture="directMessage?.userPicture"
			:channel-name="directMessage?.username"
			type="conversation"
		/>
		<div class="relative flex flex-1 flex-col flex-col-reverse min-h-0 min-w-0 z-0 overflow-scroll">
			<div class="flex flex-col pb-[1.5rem]">
				<Message
					v-for="(message, index) in messages"
					:message-id="message.id"
					:user-picture="message.userPicture"
					:username="message.username"
					:content="message.content"
					:can-edit="message.isOwner"
					:can-delete="message.isOwner"
					:is-followup="isFollowup(index)"
					:created-at="message.createdAt"
					:is-blocked="message.isBlocked"
					:key="`msg_channel_${index}`"
				/>
			</div>
			<MessageOrigin
				:user-picture="directMessage?.userPicture"
				:channel-name="directMessage?.username"
				type="conversation"
			/>
		</div>
		<MessageInput
			:context-id="channelId"
			:channel-name="directMessage?.username"
			context="conversation"
			:is-blocked="isBlocked"
		/>
	</div>
</template>