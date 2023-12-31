<script lang="ts" setup>
import { ref } from 'vue';
import Message from '@/components/channel/Message.vue';
import ChannelHeader from '@/components/channel/ChannelHeader.vue';
import MessageOrigin from '@/components/channel/MessageOrigin.vue';
import MessageInput from '@/components/channel/MessageInput.vue';
import SideChannel from '@/layouts/side-channel/SideChannel.vue';
import SideMember from '@/layouts/side-member/SideMember.vue';

const userId = ref("100");

// TODO: Retrieve the messages on the channels store or smt
// TODO: When inputing a new message, we await the api call and add it to the array if we're still on the page
const messages = ref([
	{
		id: "10",
		userId: "100",
		userPicture: "https://picsum.photos/200?random=100",
		username: "Maghwyn",
		channelId: '1',
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac erat nec ipsum dictum hendrerit. Nulla facilisi. Cras sed leo vel dui varius eleifend",
		createdAt: new Date().toISOString(),
	},
	{
		id: "11",
		userId: "100",
		userPicture: "https://picsum.photos/200?random=100",
		username: "Maghwyn",
		channelId: '1',
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac erat nec ipsum dictum hendrerit. Nulla facilisi. Cras sed leo vel dui varius eleifend",
		createdAt: new Date().toISOString(),
	},
	{
		id: "12",
		userId: "100",
		userPicture: "https://picsum.photos/200?random=100",
		username: "Maghwyn",
		channelId: '1',
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac erat nec ipsum dictum hendrerit. Nulla facilisi. Cras sed leo vel dui varius eleifend",
		createdAt: new Date().toISOString(),
	},
	{
		id: "13",
		userId: "100",
		userPicture: "https://picsum.photos/200?random=100",
		username: "Maghwyn",
		channelId: '1',
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac erat nec ipsum dictum hendrerit. Nulla facilisi. Cras sed leo vel dui varius eleifend",
		createdAt: new Date().toISOString(),
	},
	{
		id: "14",
		userId: "99",
		userPicture: "https://picsum.photos/200?random=2",
		username: "Ronald",
		channelId: '1',
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac erat nec ipsum dictum hendrerit. Nulla facilisi. Cras sed leo vel dui varius eleifend",
		createdAt: new Date().toISOString(),
	},
	{
		id: "15",
		userId: "99",
		userPicture: "https://picsum.photos/200?random=2",
		username: "Ronald",
		channelId: '1',
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac erat nec ipsum dictum hendrerit. Nulla facilisi. Cras sed leo vel dui varius eleifend",
		createdAt: new Date().toISOString(),
	},
	{
		id: "16",
		userId: "100",
		userPicture: "https://picsum.photos/200?random=100",
		username: "Maghwyn",
		channelId: '1',
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac erat nec ipsum dictum hendrerit. Nulla facilisi. Cras sed leo vel dui varius eleifend",
		createdAt: new Date().toISOString(),
	},
])

const isFollowup = (index: number) => {
	if (index > 0) {
		const currentMessage = messages.value[index];
		const previousMessage = messages.value[index - 1];
		const currentTime = +new Date(currentMessage.createdAt);
		const previousTime = +new Date(previousMessage.createdAt);
		const isSameUser = currentMessage.userId === previousMessage.userId;
		const timeDifference = (currentTime - previousTime) / (1000 * 60);
		return isSameUser && timeDifference <= 5;
	}
	return false;
}

const currentChannelName = ref("welcome");

const isSidebarOpen = ref(false);
const actionSidebar = (b: boolean) => {
	isSidebarOpen.value = b;
}
</script>

<template>
	<SideChannel/>
	<div class="flex grow flex-col h-full relative">
		<ChannelHeader
			:channel-name="currentChannelName"
			type="server"
			@sidebar="actionSidebar(!isSidebarOpen)"
		>
			<template v-slot:search>
				<SearchInput
					class="w-56"
					:placeholder="`Search a message in #${currentChannelName}`"
				/>
			</template>
		</ChannelHeader>
		<div class="relative flex flex-1 min-h-0 min-w-0 z-0">
			<div class="flex grow flex-col flex-1 relative">
				<div class="relative flex flex-1 flex-col flex-col-reverse min-h-0 min-w-0 z-0 overflow-scroll">
					<div class="flex flex-col pb-[1.5rem]">
						<Message
							v-for="(message, index) in messages"
							:message-id="message.id"
							:user-picture="message.userPicture"
							:channel-id="message.channelId"
							:username="message.username"
							:content="message.content"
							:can-edit="userId === message.userId"
							:can-delete="userId === message.userId"
							:is-followup="isFollowup(index)"
							:created-at="message.createdAt"
							:is-blocked="false"
							:is-edited="false"
							:key="`msg_channel_${index}`"
						/>
					</div>
					<MessageOrigin
						:channel-name="currentChannelName"
						type="server"
					/>
				</div>
				<MessageInput
					context-id="random"
					:channel-name="currentChannelName"
					context="server"
					:isBlocked="false"
				/>
			</div>
			<SideMember class="transition-all" :class="{ '!w-[0px] !min-w-[0px]': !isSidebarOpen, '': isSidebarOpen }"/>
		</div>
	</div>
</template>