<script lang="ts" setup>
import { ref, watch } from 'vue';
import SideConversationItem from '@/layouts/side-conversation/SideConversationItem.vue';
import VoiceStatusFooter from '@/components/ui/VoiceStatusFooter.vue';
import IconFriend from '@/components/icons/IconFriend.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconCross from '@/components/icons/IconCross.vue';

// TODO: 
const conversations = ref([
	{
		id: "X1",
		userPicture: "https://picsum.photos/200?random=1",
		username: "Bobyis",
	},
	{
		id: "X2",
		userPicture: "https://picsum.photos/200?random=2",
		username: "Ronald",
	},
	{
		id: "X3",
		userPicture: "https://picsum.photos/200?random=3",
		username: "Hugo",
	},
]);

const active = ref('default');
const setActive = (id: string) => {
	console.log("before", active.value)
	console.log("now", id)
	active.value = id; // TODO: Bug, but i'm unsure as to why it happens.
} 

watch(active, v => {
	console.log("after", v)
})
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
					<template v-slot:badge>
						<div class="flex justify-center items-center rounded-[50%] text-[11px] font-bold leading-4 mr-2 uppercase tracking-wide h-4 w-4 min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] text-center flex-auto text-white bg-red-500">
							3
						</div>
					</template>
				</SideConversationItem>
			</ul>

			<h2 class="whitespace-nowrap overflow-ellipsis overflow-hidden uppercase text-xs leading-4 tracking-wide flex-1 flex items-center h-[40px] text-[#949ba4] hover:text-white" style="padding: 18px 0px 4px 18px;">
				<span class="flex-1 overflow-hidden overflow-ellipsis">Direct Messages</span>
				<div class="flex-0 w-4 h-4 ml-0 mr-2 relative w-auto flex-shrink-0">
					<IconPlus width="16" height="16"/>
				</div>
			</h2>

			<ul class="flex flex-col gap-0.5">
				<SideConversationItem
					v-for="(conv, index) in conversations"
					:goto="`/app/channels/${conv.id}`"
					:name="conv.username"
					:image="conv.userPicture"
					:isActive="active === conv.id"
					@click="setActive(conv.id)"
					:key="`conv_${conv.id}`"
				>
					<template v-slot:badge>
						<div class="flex-0 w-4 ml-0 relative w-auto flex-shrink-0 px-2 py-2 hidden group-hover:block ">
							<IconCross width="16" height="16"/>
						</div>
					</template>
				</SideConversationItem>
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