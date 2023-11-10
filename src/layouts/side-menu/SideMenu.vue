<script lang="ts" setup>
import { computed, ref } from 'vue';
import SideMenuItem from '@/layouts/side-menu/SideMenuItem.vue';
import IconDiscovery from '@/components/icons/IconDiscovery.vue';
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import { useMessagesStore } from '@/stores/messages.store';
import { useDirectMessagesStore } from '@/stores/direct-messages.store';

const directMessageStore = useDirectMessagesStore();
const messagesStore = useMessagesStore();
const unreads = computed(() => {
	const a = messagesStore.groupUnreadsByUsers
	console.log(a)
	return a;
});
// const notifcationCount = computed(() => messagesStore.groupUnreadsNotification);

// TODO: Retrieve all the servers the users is in from the server store
// TODO: The type will be Server, and we need the lastChannelId -> Default is defaultChannelId
// TODO: The field lastChannelId will need to be reactive, so we don't always go back to the default
// TODO: We also need to add a field for the notificationCount
// TODO: Wen also need to add a field updated for when someone send a message
const servers = ref([
	{
		id: "1",
		iconUrl: "https://picsum.photos/200?random=4",
		lastChannelId: "1",
		name: "Random name 1",
		notificationCount: 10,
		updated: true,
	},
	{
		id: "2",
		iconUrl: "https://picsum.photos/200?random=5",
		lastChannelId: "1",
		name: "Random name 2",
		notificationCount: 20,
		updated: true,
	},
	{
		id: "3",
		iconUrl: "https://picsum.photos/200?random=6",
		lastChannelId: "1",
		name: "Random name 3",
		notificationCount: 120,
		updated: true,
	},
	{
		id: "4",
		iconUrl: "https://picsum.photos/200?random=7",
		lastChannelId: "1",
		name: "Random name 4",
		notificationCount: 3,
		updated: true,
	},
	{
		id: "5",
		iconUrl: "https://picsum.photos/200?random=8",
		lastChannelId: "1",
		name: "Random name 5",
		notificationCount: 5,
		updated: true,
	},
	{
		id: "6",
		iconUrl: "https://picsum.photos/200?random=9",
		lastChannelId: "1",
		name: "Random name 6",
		notificationCount: 0,
		updated: false,
	},
	{
		id: "7",
		iconUrl: "https://picsum.photos/200?random=10",
		lastChannelId: "1",
		name: "Random name 7",
		notificationCount: 12,
		updated: true,
	},
	{
		id: "8",
		iconUrl: "https://picsum.photos/200?random=11",
		lastChannelId: "1",
		name: "Random name 8",
		notificationCount: 0,
		updated: false,
	},
	{
		id: "9",
		iconUrl: "https://picsum.photos/200?random=12",
		lastChannelId: "1",
		name: "Random name 9",
		notificationCount: 27,
		updated: true,
	},
	{
		id: "10",
		iconUrl: "https://picsum.photos/200?random=13",
		lastChannelId: "1",
		name: "Random name 10",
		notificationCount: 30,
		updated: true,
	},
]);

const active = ref("default");
const setActive = (id: string) => {
	active.value = id;
}

const setDirectMessageActive = (id: string) => {
	directMessageStore.active = id;
	active.value = id;
}
</script>

<template>
	<nav class="hidden-scrollbar fixed z-50 h-screen w-[70px] gap-3 overflow-y-auto pt-3 pb-2 bg-gradient-to-b from-semibackground to-background">
		<div class="pointer-events-none fixed bottom-0 z-10 h-32 w-[70px] bg-gradient-to-b from-transparent to-black/20"></div>

		<SideMenuItem
			:iconStyling="`mx-auto mb-2 flex items-center justify-center bg-foreground ${active === 'default' ? 'bg-primary text-white' : 'text-gray-300'}`"
			:notificationCount="10"
			goto="/app/channels/me"
			identifier="default"
			tooltipContent="Direct messages"
			:isActive="active === 'default'"
			:updated="false"
			:round="false"
			@click="setActive('default')"
		>
			<template v-slot:icon>
				<IconDiscord width="1em" height="1em"/>
			</template>
		</SideMenuItem>

		<SideMenuItem
			v-for="(channel, index) in unreads"
			:icon-styling="`mx-auto my-1 flex items-center justify-center`"
			:notification-count="channel.notificationCount"
			:goto="`/app/channels/${channel.channelId}`"
			:image="channel.userPicture"
			:identifier="channel.channelId"
			:tooltip-content="channel.username"
			:is-active="active === channel.channelId"
			:updated="true"
			:round="true"
			:key="`direct_msg_${index}_${channel.notificationCount}`"
			@click="setDirectMessageActive(channel.channelId)"
		>
			<template v-slot:icon>
				<div class="flex items-center justify-center w-full h-full rounded-[50%] bg-pink-400 text-white">
					<IconDiscord width="32" height="32"/>
				</div>
			</template>
		</SideMenuItem>

		<div class="bg-white bg-opacity-10 mx-auto h-0.5 w-8 my-1"/>

		<SideMenuItem
			v-for="(server, index) in servers"
			:iconStyling="`mx-auto my-1 flex items-center justify-center`"
			:notificationCount="server.notificationCount"
			:goto="`/app/servers/${server.id}/${server.lastChannelId}`"
			:image="`${server.iconUrl}`"
			:identifier="server.id"
			:tooltipContent="server.name"
			:isActive="active === server.id"
			:updated="server.updated"
			:round="true"
			:key="`server_${index}`"
			@click="setActive(server.id)"
		/>

		<div class="bg-white bg-opacity-10 mx-auto h-0.5 w-8 my-2"/>

		<SideMenuItem
			iconStyling="mx-auto mb-2 flex items-center justify-center bg-foreground"
			:notificationCount="0"
			goto="/app/servers-discovery"
			identifier="discovery"
			tooltipContent="Servers discovery"
			:isActive="active === 'discovery'"
			:updated="false"
			:round="true"
			@click="setActive('discovery')"
		>
			<template v-slot:icon>
				<div class="w-full h-full flex justify-center items-center rounded-[50%] text-green-500">
					<IconDiscovery width="28" height="28"/>
				</div>
			</template>
		</SideMenuItem>

		<SideMenuItem
			iconStyling="mx-auto mb-2 flex items-center justify-center bg-foreground"
			:notificationCount="0"
			identifier="server"
			tooltipContent="Create server"
			:isActive="false"
			:updated="false"
			:round="true"
		>
			<template v-slot:icon>
				<div class="w-full h-full flex justify-center items-center rounded-[50%] text-green-500">
					<IconPlus width="28" height="28"/>
				</div>
			</template>
		</SideMenuItem>
	</nav>
</template>