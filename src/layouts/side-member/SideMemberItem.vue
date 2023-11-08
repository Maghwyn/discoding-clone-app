<script lang="ts" setup>
import IconDiscord from '@/components/icons/IconDiscord.vue';

defineProps<{
	name: string;
	image?: string
}>();
</script>

<template>
	<li class="group rounded text-[#949ba4] hover:text-white hover:bg-[#4E50584D] cursor-pointer">
		<div class="flex min-w-0 flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden items-center text-inherit">
			<div class="grow min-w-[0px] flex items-center rounded px-2 h-[42px]">
				<div class="flex items-center w-8 h-8 mr-3">
					<img
						v-if="image"
						:src="image"
						alt="xxx"
						width="32"
						height="32"
						class="inset-0 z-0 rounded-[50%]"
					/>
					<div v-else class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%] bg-pink-400 text-white">
						<IconDiscord width="20" height="20"/>
					</div>
				</div>
				<div class="flex-auto min-w-[0px] whitespace-nowrap text-ellipsis overflow-hidden">
					<div class="flex justify-start items-center">
						<span class="text-base font-medium leading-5 text-[16px] whitespace-nowrap overflow-hidden overflow-ellipsis flex-shrink-0">
							{{ name }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</li>
</template>