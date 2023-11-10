<script lang="ts" setup>
import { formatDateYMDHM } from '@/utils/date.helper';
import IconDiscord from '@/components/icons/IconDiscord.vue';

defineProps<{
	userPicture?: string;
	username: string;
	content: string
	isEdited: boolean;
	createdAt: string;
}>();
</script>

<template>
	<li class="group rounded bg-[#313338] py-1.5">
		<div class="w-full px-4 message-wrapper">
			<div class="w-full flex py-0.5 gap-3 justify-center transition duration-200 relative message-container">
				<div v-if="userPicture" class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%]">
					<img
						:src="userPicture"
						alt="xxx"
						width="32"
						height="32"
						class="inset-0 z-0 rounded-[50%]"
					/>
				</div>
				<div v-else class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%] bg-pink-400 text-white">
					<IconDiscord width="20" height="20"/>
				</div>
				<div class="flex flex-col grow gap-0.5">
					<div class="flex gap-2 items-end">
						<span class="leading-none text-[13px] font-bold text-white">{{ username }}</span>
						<span class="text-[10px] text-[#949ba4] leading-none">{{ formatDateYMDHM(new Date(createdAt)) }}</span>
					</div>
					<div class="text-[12px] text-white font-light">
						{{ content }} <span v-if="isEdited" class="text-[8px] text-[#949ba4]">{{ '(edited)' }}</span>
					</div>
				</div>
			</div>
		</div>
	</li>
</template>

<style scoped>
.message-wrapper:hover {
	background-color: #2e3035;
	transition: background-color 0s !important;
}

.message-container:hover > .message-menu {
	display: flex !important;
}

.message-container:hover > .message-sm-date > span {
	display: flex !important;
}
</style>