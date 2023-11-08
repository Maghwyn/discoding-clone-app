<script lang="ts" setup>
import IconDiscord from '@/components/icons/IconDiscord.vue';

defineProps<{
	userPicture?: string;
	username: string;
}>();
</script>

<template>
	<div class="flex flex-col z-10 h-12 channel-header-shadow">
		<div class="flex-grow min-w-[0px] flex items-center rounded pl-3 h-[42px]">
			<div class="flex items-center w-8 h-8 mr-1">
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
			<div class="flex-auto min-w-[0px] whitespace-nowrap text-ellipsis overflow-hidden">
				<div class="flex justify-start items-center">
					<span class="text-base font-medium leading-5 text-[16px] whitespace-nowrap overflow-hidden overflow-ellipsis flex-shrink-0 text-white">
						{{ username || "unknown" }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.channel-header-shadow {
	box-shadow: 0 1px 0 hsla(0, 0%, 0.8%, 0.2), 0 1.5px 0 hsla(240, 7.7%, 2.5%, 0.05), 0 2px 0 hsla(0, 0%, 0.8%, 0.05);
}
</style>