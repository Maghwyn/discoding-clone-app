<script lang="ts" setup>
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconGroup from '@/components/icons/IconGroup.vue';
import IconHashtag from '@/components/icons/IconHashtag.vue';
import SearchInput from '@/components/ui/SearchInput.vue';

defineProps<{
	userPicture?: string;
	channelName: string;
	type: 'conversation' | 'server'
}>();

const emits = defineEmits(['sidebar'])

const actionSidebar = () => {
	emits('sidebar');
}
</script>

<template>
	<div class="flex flex-row z-10 h-12 channel-header-shadow items-center px-3">
		<div class="grow min-w-[0px] flex items-center rounded h-[42px]">
			<div v-if="type === 'conversation'" class="flex items-center w-8 h-8 mr-1">
				<img
					v-if="userPicture"
					:src="userPicture"
					alt="xxx"
					width="24"
					height="24"
					class="inset-0 z-0 rounded-[50%]"
				/>
				<div v-else class="flex items-center justify-center w-6 h-6 min-w-[24px] rounded-[50%] bg-pink-400 text-white">
					<IconDiscord width="14" height="14"/>
				</div>
			</div>
			<div v-else class="flex items-center justify-center w-6 h-6 min-w-[24px] mr-2 text-[#949ba4]">
				<IconHashtag width="20" height="20"/>
			</div>
			<div class="flex-auto min-w-[0px] whitespace-nowrap text-ellipsis overflow-hidden">
				<div class="flex justify-start items-center">
					<span class="text-base font-medium leading-5 text-[16px] mb-0.5 whitespace-nowrap overflow-hidden overflow-ellipsis flex-shrink-0 text-white">
						{{ channelName || "unknown" }}
					</span>
				</div>
			</div>
		</div>
		<div v-if="type === 'server'" class="flex gap-2 items-center justify-center text-[#949ba4] hover:text-white">
			<button class="p-3 cursor-pointer" @click="actionSidebar">
				<IconGroup/>
			</button>
		</div>
		<SearchInput class="w-56"/>
	</div>
</template>

<style>
.channel-header-shadow {
	box-shadow: 0 1px 0 hsla(0, 0%, 0.8%, 0.2), 0 1.5px 0 hsla(240, 7.7%, 2.5%, 0.05), 0 2px 0 hsla(0, 0%, 0.8%, 0.05);
}
</style>