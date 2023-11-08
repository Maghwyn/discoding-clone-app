<script lang="ts" setup>
import { ref } from 'vue';
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconGroup from '@/components/icons/IconGroup.vue';
import IconHashtag from '@/components/icons/IconHashtag.vue';

defineProps<{
	userPicture?: string;
	channelName: string;
	type: 'conversation' | 'server'
}>();

const emits = defineEmits(['sidebar'])

const search = ref('');

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
		<div>
			<label class="flex justify-center items-center relative">
				<input
					id="search-message-input"
					class="flex w-56 text-white text-xs items-center border-none outline-none rounded-md p-1/4 p-2 p-1/4 p-1/2 bg-background"
					:placeholder="`Search a message in @name`"
				>
				<div class="absolute right-[8px] text-[#949ba4]">
					<svg v-if="search === ''" id="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-active" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
					</svg>
					<svg v-else id="clear-search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="pointer" viewBox="0 0 16 16">
						<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
					</svg>
				</div>
			</label>
		</div>
	</div>
</template>

<style>
.channel-header-shadow {
	box-shadow: 0 1px 0 hsla(0, 0%, 0.8%, 0.2), 0 1.5px 0 hsla(240, 7.7%, 2.5%, 0.05), 0 2px 0 hsla(0, 0%, 0.8%, 0.05);
}
</style>