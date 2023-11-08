<script lang="ts" setup>
import { ref } from 'vue';
import IconMic from '@/components/icons/IconMic.vue';
import IconHeadphones from '@/components/icons/IconHeadphones.vue';
import IconGear from '@/components/icons/IconGear.vue';

const username = ref('Maghwyn');
const deafen = ref(false);
const muted = ref(false);

const setMute = (b: boolean) => {
	muted.value = b;

	if (!muted.value && deafen.value) {
		deafen.value = false;
	}
}

const setDeafen = (b: boolean) => {
	deafen.value = b;
	muted.value = b;
}
</script>

<template>
	<div class="flex justify-between gap-1 bg-semibackground px-2 py-1.5">
		<button class="flex gap-2 rounded-md py-1 w-[120px] max-w-[120px] pl-0.5 pr-2 text-left leading-tight hover:bg-[#4E505899] overflow-hidden">
			<img
				src="https://picsum.photos/200?random=100"
				alt="xxx"
				width="32"
				height="32"
				class="inset-0 z-0 rounded-[50%]"
			/>
			<div>
				<div class="text-xs text-white whitespace-nowrap overflow-ellipsis overflow-hidden block">{{ username }}</div>
				<div class="text-[11px] font-light text-[#949ba4] whitespace-nowrap overflow-ellipsis overflow-hidden block">
					Do Not Disturb
				</div>
			</div>
		</button>
		<div class="flex items-center">
			<button
				class="group relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#4E505899] text-[#949ba4]"
				@click="setMute(!muted)"
			>
				<IconMic width="20" height="20"/>
				<div v-if="muted" class="absolute h-3/4 w-[5px] rotate-45 rounded-sm border-[2px] border-semibackground bg-red-500 group-hover:border-[#3a3c42]"></div>
			</button>
			<button
				class="group relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#4E505899] text-[#949ba4]"
				@click="setDeafen(!deafen)"
			>
				<IconHeadphones width="20" height="20"/>
				<div v-if="deafen" class="absolute h-3/4 w-[5px] rotate-45 rounded-sm border-[2px] border-semibackground bg-red-500 group-hover:border-[#3a3c42]"></div>
			</button>
			<button class="group relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#4E505899] text-[#949ba4]">
				<IconGear width="20" height="20"/>
			</button>
		</div>
	</div>
</template>