<script lang="ts" setup>
import { ref } from 'vue';

const name = ref("name");
</script>


<template>
	<div class="w-full h-fit flex flex-col px-[1rem] py-[1rem] gap-4">
		<span class="font-bold text-[20px] text-white">{{ name }}</span>
		<span class="font-light text-[14px] fw-normal text-[#949ba4]">This is the beginning of your direct message history with <b>{{ name }}</b></span>
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