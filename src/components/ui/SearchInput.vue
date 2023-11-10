<script lang="ts" setup>
import { ref, watch } from 'vue';

defineProps<{
	placeholder: string;
}>();

const emits = defineEmits(['search']);
const search = ref('');

watch(search, value => {
	emits('search', value);
})
</script>

<template>
	<div>
		<label class="flex grow justify-center items-center relative">
			<input
				id="search-message-input"
				v-model="search"
				class="flex grow text-white text-xs items-center border-none outline-none rounded-md p-1/4 p-2 p-1/4 p-1/2 bg-background"
				:placeholder="placeholder"
			>
			<div class="absolute right-[8px] text-[#949ba4]">
				<svg v-if="search === ''" id="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-active" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
				</svg>
				<svg v-else id="clear-search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="pointer" viewBox="0 0 16 16">
					<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
				</svg>
			</div>
		</label>
	</div>
</template>