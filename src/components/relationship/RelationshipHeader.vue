<script lang="ts" setup>
import { ref } from 'vue';
import IconFriend from '@/components/icons/IconFriend.vue';

const emits = defineEmits(["tabChange"]);
const changeTab = (tab: string) => {
	emits('tabChange', tab);
}
</script>

<template>
	<div class="flex flex-row z-10 h-12 relashionship-header-shadow items-center px-3">
		<div class="min-w-[0px] flex items-center rounded h-[42px]">
			<div class="flex items-center justify-center w-6 h-6 min-w-[24px] text-[#949ba4] mr-2">
				<IconFriend width="20" height="20"/>
			</div>
			<div class="flex-auto min-w-[0px] whitespace-nowrap text-ellipsis overflow-hidden">
				<div class="flex justify-start items-center">
					<span class="font-medium leading-5 text-[15px] whitespace-nowrap overflow-hidden overflow-ellipsis flex-shrink-0 text-white">
						{{ "Friends" }}
					</span>
				</div>
			</div>
		</div>
		<div class="bg-white bg-opacity-10 mx-auto h-5 w-[1px] mx-3"/>
		<div class="grow flex gap-3">
			<button
				class="px-2 py-0.5 hover:bg-[#4E50584D] text-[#949ba4] hover:text-white text-[14px] rounded-sm" 
				@click="changeTab('all')"
			>
				All
			</button>
			<button
				class="px-2 hover:bg-[#4E50584D] text-[#949ba4] hover:text-white text-[14px] rounded-sm flex items-center justify-between gap-2"
				@click="changeTab('blocked')"
			>
				<span>Blocked</span>
				<div class="flex justify-center items-center rounded-[50%] text-[11px] font-bold leading-4 uppercase tracking-wide h-4 w-4 min-w-[16px] max-w-[16px] min-h-[16px] max-h-[16px] text-center flex-auto text-white bg-red-500">
					{{ 3 }}
				</div>
			</button>
			<button class="px-2 bg-[#248046] text-white text-[14px] rounded-sm">Add Friend</button>
		</div>
	</div>
</template>

<style>
.relashionship-header-shadow {
	box-shadow: 0 1px 0 hsla(0, 0%, 0.8%, 0.2), 0 1.5px 0 hsla(240, 7.7%, 2.5%, 0.05), 0 2px 0 hsla(0, 0%, 0.8%, 0.05);
}
</style>