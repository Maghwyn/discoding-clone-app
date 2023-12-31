<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import SideMenuItem from '@/layouts/side-menu/SideMenuItem.vue';
import IconDiscovery from '@/components/icons/IconDiscovery.vue';
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import { userServersStore } from "@/stores/userServers.store";
import { storeToRefs } from "pinia";
import { getUserServers } from "@/api/server.req";
import { useModal } from "vue-final-modal";
import NewServerModal from "@/components/form/newServerModal.vue";
import { channelsStore} from "@/stores/channel.store";
import { getServerChannels } from "@/api/channels.req";
import { useMessagesStore } from '@/stores/messages.store';
import { useDirectMessagesStore } from '@/stores/direct-messages.store';

const { open, close } = useModal({
  component: NewServerModal,
  attrs: {
    defaultCheck: 'text',
    onConfirm() {
      close()
    },
  },
  slots: {
    default: '',
  },
})


const directMessageStore = useDirectMessagesStore();
const messagesStore = useMessagesStore();
const unreads = computed(() => {
	const a = messagesStore.groupUnreadsByUsers
	return a;
});
// const notifcationCount = computed(() => messagesStore.groupUnreadsNotification);

// TODO: Retrieve all the servers the users is in from the server store
// TODO: The type will be Server, and we need the lastChannelId -> Default is defaultChannelId
// TODO: The field lastChannelId will need to be reactive, so we don't always go back to the default
// TODO: We also need to add a field for the notificationCount
// TODO: Wen also need to add a field updated for when someone send a message
const serversStore = userServersStore();
const channelStore = channelsStore()
const servs = ref()
onMounted(async ()=>{
  const servsAPI = await getUserServers()
  serversStore.addUserServers(servsAPI.data)
  const { servers } = storeToRefs(serversStore)
  servs.value = servers.value
})

const active = ref("default");
const setActive = async (id: string) => {
	active.value = id;
  const res = await getServerChannels(id)
  const serveur = servs.value.filter(serv => serv._id == id)
  res.data[0].serverName = serveur[0].name
  channelStore.addChannels(res.data)
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
			v-for="(server, index) in servs"
			:iconStyling="`mx-auto my-1 flex items-center justify-center`"
			:notificationCount="server.notificationCount"
			:goto="`/app/servers/${server._id}/${server.lastChannelId}`"
			:image="`${server.iconUrl}`"
			:identifier="server._id"
			:tooltipContent="server.name"
			:isActive="active === server._id"
			:updated="server.updated"
			:round="true"
			:key="`direct_msg_${index}`"
			@click="setActive(server._id)"

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
      @click="()=> {open()}"
		>
			<template v-slot:icon>
				<div class="w-full h-full flex justify-center items-center rounded-[50%] text-green-500">
					<IconPlus width="28" height="28"/>
				</div>
			</template>
		</SideMenuItem>
	</nav>
</template>