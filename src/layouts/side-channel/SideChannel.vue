<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useModal } from 'vue-final-modal'

import SideChannelItem from '@/layouts/side-channel/SideChannelItem.vue';
import VoiceStatusFooter from '@/components/ui/VoiceStatusFooter.vue';
import IconHashtag from '@/components/icons/IconHashtag.vue';
import IconAudio from '@/components/icons/IconAudio.vue';
import IconWave from '@/components/icons/IconWave.vue';
import IconPlus from "@/components/icons/IconPlus.vue";
import NewChannelModal from "@/components/channel/NewChannelModal.vue";
const { open, close } = useModal({
  component: NewChannelModal,
  attrs: {
    defaultCheck: 'text',
    onConfirm() {
      close()
    },
    onClose(){
      close()
    }
  },
  slots: {
    default: '',
  },
})
// TODO: 
const channelsList = ref([
	{
		id: "2",
		name: "gaming",
		notificationCount: 0,
		type: 'text'
	},
	{
		id: "3",
		name: "shit-posting",
		notificationCount: 5,
		type: 'text'
	},
	{
		id: "4",
		name: "general",
		notificationCount: 5,
		type: 'audio'
	},
]);

const textChannels = computed(() => channelsList.value.filter((c) => c.type === 'text'));
const audioChannels = computed(() => channelsList.value.filter((c) => c.type === 'audio'));

const serverId = ref("1");
const defaultChannelName = ref("welcome");
const defaultChannelId = ref("1");
const defaultChannelNotificationCount = ref(0);

const active = ref('default');
const setActive = (id: string) => {
	active.value = id; // TODO: Bug, but i'm unsure as to why it happens.
}
</script>

<template>
	<div class="flex flex-col w-[240px] min-w-[240px] overflow-hidden">
		<div class="bottom-70 flex flex-col z-10">
			<div class="px-4 flex h-12 items-center bg-midground search-header-shadow text-white text-[15px] justify-between">
				Server name
        <button @click="() => open()">
          <icon-plus width="20" height="20" style="cursor: pointer" />
        </button>
			</div>
		</div>
		<div class="hover-scrollbar flex-1 overflow-y-auto py-2 px-2 bg-midground">
			<ul>
				<SideChannelItem
					:goto="`/app/servers/${serverId}/${defaultChannelId}`"
					:name="defaultChannelName"
					:isActive="active === 'default'"
					@click="setActive('default')"
				>
					<template v-slot:icon>
						<IconWave width="20" height="20"/>
					</template>
					<template v-if="defaultChannelNotificationCount > 0" v-slot:badge>
						<div class="flex justify-center items-center rounded-[50%] text-[11px] font-bold leading-4 mr-2 uppercase tracking-wide h-4 w-4 min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] text-center flex-auto text-white bg-red-500">
							{{ defaultChannelNotificationCount }}
						</div>
					</template>
				</SideChannelItem>
			</ul>
			

			<div class="bg-white bg-opacity-10 mx-auto h-[1px] w-full my-1.5"/>

			<h2 class="whitespace-nowrap pl-1 overflow-ellipsis overflow-hidden uppercase text-xs leading-4 tracking-wide flex-1 flex items-center h-[40px] text-[#949ba4] hover:text-white">
				<span class="flex-1 overflow-hidden overflow-ellipsis uppercase">Text channels</span>
			</h2>

			<ul class="flex flex-col gap-0.5">
				<SideChannelItem
					v-for="(channel, index) in textChannels"
					:goto="`/app/servers/${serverId}/${channel.id}`"
					:name="channel.name"
					:isActive="active === channel.id"
					@click="setActive(channel.id)"
				>
					<template v-slot:icon>
						<IconHashtag v-if="channel.type === 'text'" width="20" height="20"/>
						<IconAudio v-if="channel.type === 'audio'" width="20" height="20"/>
					</template>
					<template v-if="channel.notificationCount > 0" v-slot:badge>
						<div class="flex justify-center items-center rounded-[50%] text-[11px] font-bold leading-4 mr-2 uppercase tracking-wide h-4 w-4 min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] text-center flex-auto text-white bg-red-500">
							{{ channel.notificationCount }}
						</div>
					</template>
				</SideChannelItem>
			</ul>

			<h2 class="whitespace-nowrap pl-1 overflow-ellipsis overflow-hidden uppercase text-xs leading-4 tracking-wide flex-1 flex items-center h-[40px] text-[#949ba4] hover:text-white">
				<span class="flex-1 overflow-hidden overflow-ellipsis uppercase">Audio channels</span>
			</h2>

			<ul class="flex flex-col gap-0.5">
				<SideChannelItem
					v-for="(channel, index) in audioChannels"
					:goto="`/app/servers/${serverId}/${channel.id}`"
					:name="channel.name"
					:isActive="active === channel.id"
					@click="setActive(channel.id)"
				>
					<template v-slot:icon>
						<IconHashtag v-if="channel.type === 'text'" width="20" height="20"/>
						<IconAudio v-if="channel.type === 'audio'" width="20" height="20"/>
					</template>
				</SideChannelItem>
			</ul>
		</div>
		<VoiceStatusFooter />
	</div>
</template>

<style>
.search-header-shadow {
	box-shadow: 0 1px 0 hsla(0, 0%, 0.8%, 0.2), 0 1.5px 0 hsla(240, 7.7%, 2.5%, 0.05), 0 2px 0 hsla(0, 0%, 0.8%, 0.05);
}
</style>