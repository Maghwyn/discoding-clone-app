<script lang="ts" setup>
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { ref, computed, h, render } from 'vue';
import SideConversationItem from '@/layouts/side-conversation/SideConversationItem.vue';
import VoiceStatusFooter from '@/components/ui/VoiceStatusFooter.vue';
import IconFriend from '@/components/icons/IconFriend.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconCross from '@/components/icons/IconCross.vue';
import IconDiscord from '@/components/icons/IconDiscord.vue';
import { useDirectMessagesStore } from '@/stores/direct-messages.store';
import DirectMessagesForm from '@/components/form/DirectMessagesForm.vue';

const router = useRouter();
const directMessagesStore = useDirectMessagesStore();
const channels = computed(() => directMessagesStore.channels);
const active = computed(() => directMessagesStore.active);

const setActive = (id: string) => {
	directMessagesStore.active = id;
}

const openModal = () => {
	Swal.fire({
		html: '<div id="VueSweetAlert2"></div>',
		showConfirmButton: false,
		background: 'transparent',
		willOpen() {
			const vnode = h(DirectMessagesForm, { router });
			const el = document.createElement("div");
			render(vnode, el);
			document.getElementById('VueSweetAlert2').appendChild(el);
		},
	})
}

// TODO: This should be related to the relationship / pending / blocked or other stuff with notification
const relationshipNotificationCount = ref(3);
</script>

<template>
	<div class="flex flex-col w-[240px] min-w-[240px] overflow-hidden">
		<div class="bottom-70 flex flex-col z-10">
			<div class="px-2 flex h-12 items-center bg-midground search-header-shadow">
				<button class="flex w-full justify-between rounded-sm bg-background p-1.5 text-left text-xs text-[#949ba4] hover:bg-background/70">
					Find or start a conversation
				</button>
			</div>
		</div>
		<div class="hover-scrollbar flex-1 overflow-y-auto py-2 px-2 bg-midground">
			<ul>
				<SideConversationItem
					goto="/app/channels/me"
					name="Friends"
					:isActive="active === 'default'"
					@click="setActive('default')"
				>
					<template v-slot:icon>
						<IconFriend/>
					</template>
					<template v-if="relationshipNotificationCount > 0" v-slot:badge>
						<div class="flex justify-center items-center rounded-[50%] text-[11px] font-bold leading-4 mr-2 uppercase tracking-wide h-4 w-4 min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] text-center flex-auto text-white bg-red-500">
							{{ relationshipNotificationCount }}
						</div>
					</template>
				</SideConversationItem>
			</ul>

			<h2 @click="openModal" class="cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden uppercase text-xs leading-4 tracking-wide flex-1 flex items-center h-[40px] text-[#949ba4] hover:text-white mb-1" style="padding: 18px 0px 4px 18px;">
				<span class="flex-1 overflow-hidden overflow-ellipsis">Direct Messages</span>
				<div class="flex-0 w-4 h-4 ml-0 mr-2 relative w-auto flex-shrink-0">
					<IconPlus width="16" height="16"/>
				</div>
			</h2>

			<ul v-if="channels.length > 0" class="flex flex-col gap-0.5">
				<SideConversationItem
					v-for="channel in channels"
					:goto="`/app/channels/${channel.id}`"
					:name="channel.username"
					:image="channel.userPicture"
					:isActive="active === channel.id"
					@click="setActive(channel.id)"
					:key="`conv_${channel.id}`"
				>
					<template v-slot:icon>
						<div class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%] bg-pink-400 text-white">
							<IconDiscord width="20" height="20"/>
						</div>
					</template>
					<template v-slot:badge>
						<div class="flex-0 w-4 ml-0 relative w-auto flex-shrink-0 px-2 py-2 hidden group-hover:block ">
							<IconCross width="16" height="16"/>
						</div>
					</template>
				</SideConversationItem>
			</ul>
			<div v-else class="w-full flex items-start justify-center pt-4">
				<img src="/taken.svg" class="grayscale">
			</div>
		</div>
		<VoiceStatusFooter />
	</div>
</template>

<style>
.search-header-shadow {
	box-shadow: 0 1px 0 hsla(0, 0%, 0.8%, 0.2), 0 1.5px 0 hsla(240, 7.7%, 2.5%, 0.05), 0 2px 0 hsla(0, 0%, 0.8%, 0.05);
}
</style>