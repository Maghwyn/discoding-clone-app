<script lang="ts" setup>
const props = defineProps<{
	count: number;
}>()

const count = props.count > 99 ? "99+" : props.count.toString();
</script>

<template>
	<div
		class="middle z-10 absolute -bottom-1 -right-1 align-bottom transition-all min-w-[25px] text-center rounded-full px-[4px] py-[0px] text-[11px] font-bold border-4 border-background bg-red-500 text-white"
		:class="{ 'scale-100 opacity-100': props.count > 0, 'scale-0 opacity-0': props.count === 0 }"
	>
		{{ count }}
	</div>
</template>