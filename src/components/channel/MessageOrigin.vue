<script lang="ts" setup>
import IconDiscord from '@/components/icons/IconDiscord.vue';

defineProps<{
	userPicture?: string;
	channelName: string;
	type: 'conversation' | 'server'
}>();
</script>


<template>
	<div class="w-full h-fit flex flex-col px-[1rem] py-[1rem] gap-4">
		<div v-if="type === 'conversation'" class="flex items-center w-12 h-12 mr-1 gap-4">
			<img
				v-if="userPicture"
				:src="userPicture"
				alt="xxx"
				width="40"
				height="40"
				class="inset-0 z-0 rounded-[50%]"
			/>
			<div v-else class="flex items-center justify-center w-12 h-12 min-w-[48px] rounded-[50%] bg-pink-400 text-white">
				<IconDiscord width="32" height="32"/>
			</div>
			<span class="font-bold text-[20px] text-white">{{ channelName || 'unknown' }}</span>
		</div>
		<span class="font-light text-[14px] fw-normal text-[#949ba4]">This is the beginning of your direct message history with <b>{{ channelName || 'unknown' }}</b></span>
		<div class="w-full h-[1px] bg-gray-800"/>
	</div>
</template>

<style>


.discoding-channel-origin-separator {
    width: 100%;
    opacity: 1;
    border-top: 1px solid #2b2d31;
    border-bottom: 1px solid #2b2d31;
    margin: .5rem 0;
}
</style>