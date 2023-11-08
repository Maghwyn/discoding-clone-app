<script lang="ts" setup>
defineProps<{
	goto: string;
	name: string;
	image?: string
	isActive: boolean;
}>();
</script>

<template>
	<li class="group rounded text-[#949ba4] hover:text-white hover:bg-[#4E50584D]" :class="isActive ? 'bg-[#4E505887] !text-white' : ''">
		<router-link :to="goto" tabindex="-1" class="flex min-w-0 flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden items-center text-inherit">
			<div class="flex-grow min-w-[0px] flex items-center rounded px-2 h-[42px]">
				<div class="flex items-center w-8 h-8 mr-3">
					<img
						v-if="image"
						:src="image"
						alt="xxx"
						width="32"
						height="32"
						class="inset-0 z-0 rounded-[50%]"
					/>
					<slot v-else name="icon"/>
				</div>
				<div class="flex-auto min-w-[0px] whitespace-nowrap text-ellipsis overflow-hidden">
					<div class="flex justify-start items-center">
						<span class="text-base font-medium leading-5 text-[16px] whitespace-nowrap overflow-hidden overflow-ellipsis flex-shrink-0">
							{{ name }}
						</span>
					</div>
				</div>
			</div>
			<slot name="badge"/>
		</router-link>
	</li>
</template>