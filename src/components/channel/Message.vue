<script lang="ts" setup>
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';

defineProps<{
	userPicture: string;
	username: string;
	content: string;
	createdAt: string;
	isFollowup: boolean;
	canEdit: boolean;
}>()

function formatDateYMDHM(date: Date) {
	try {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: 'numeric',
			minute: '2-digit',
		}).format(date);
	} catch(err) {
		return "unkown"
	}
}

function formatDateHM(date: Date) {
	try {
		return new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: '2-digit',
		}).format(date);
	} catch(err) {
		return "unkown"
	}
}
</script>

<template>
	<div class="w-full px-4 message-wrapper" :class="{ 'mt-3': !isFollowup }">
		<div class="w-full flex py-0.5 gap-3 justify-center transition duration-200 relative message-container">
			<div v-if="canEdit" class="message-menu absolute hidden justify-center items-center cursor-pointer right-[10px] top-[-10px] text-[14px] rounded-md bg-[#2e3035] border border-[#26282c] text-[#949ba4]">
				<div class="px-1.5 py-1 flex items-center justify-center">
					<IconEdit width="18" height="18" class="hover:text-orange-500"/>
				</div>
				<div class="px-1.5 py-1 flex items-center justify-center">
					<IconDelete width="18" height="18"  class="hover:text-red-500"/>
				</div>
			</div>
			<template v-if="!isFollowup">
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
			</template>
			<div v-else class="flex items-center justify-center text-[7px] text-[#949ba4] leading-none w-8 min-w-[32px] message-sm-date">
				<span class="hidden">{{ formatDateHM(new Date(createdAt)) }}</span>
			</div>
			<div class="flex flex-col grow gap-0.5">
				<div v-if="!isFollowup" class="flex gap-2 items-end">
					<span class="leading-none text-[13px] font-bold text-white">{{ username }}</span>
					<span class="text-[10px] text-[#949ba4] leading-none">{{ formatDateYMDHM(new Date(createdAt)) }}</span>
				</div>
				<div class="text-[12px] text-white font-light">
					{{ content }}
				</div>
			</div>
		</div>
	</div>
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