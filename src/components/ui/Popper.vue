<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const props = defineProps<{
	content: string;
	identifier: string;
}>()

const tooltipX = ref(-100);
const tooltipY = ref(-100);
const hovered = ref(false);

const onHoverEnter = () => {
	const popperSlot = document.getElementById(`rx:${props.identifier}`);
	if (popperSlot) {
		const circleRect = popperSlot.getBoundingClientRect();
		const tooltipHeight = 24;

		const left = circleRect.right;
		const top = (circleRect.top + circleRect.height / 2 - tooltipHeight / 2) - 5/2;

		tooltipX.value = left;
		tooltipY.value = top;
		hovered.value = true;
	}
}

const onHoverLeave = () => {
	hovered.value = false;
	tooltipX.value = -100;
	tooltipY.value = -100;
}
</script>

<template>
	<div class="mx-auto relative flex items-center" @mouseover="onHoverEnter" @mouseleave="onHoverLeave">
		<slot/>
		<div
			v-if="hovered"
			class="fixed block ml-[1rem] bg-black text-white p-[5px] px-2 rounded-md text-sm z-30"
			:style="{ left: `${tooltipX}px`, top: `${tooltipY}px` }"
		>
			<div class="relative">
				<span class="absolute triangle rotate-45 left-[-7.5px]"></span>
				<span>{{ content }}</span>
			</div>
		</div>
	</div>
</template>

<style>
.triangle {
	width: 0;
	height: 0;
	border-right: 7.5px solid transparent; /* Adjust the width of the triangle */
	border-top: 7.5px solid transparent; /* Adjust the width of the triangle */
	border-bottom: 7.5px solid black; /* Adjust the color and height of the triangle */
}
</style>