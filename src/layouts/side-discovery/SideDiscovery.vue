<script lang="ts" setup>
import VoiceStatusFooter from '@/components/ui/VoiceStatusFooter.vue';
</script>

<template>
	<div class="flex flex-col w-[240px] min-w-[240px] overflow-hidden">
		<div class="bottom-70 flex flex-col z-10">
			<div class="px-4 flex h-12 items-center bg-midground discovery-header-shadow text-white text-[15px]">
				Servers discovery
			</div>
		</div>
		<div class="hover-scrollbar flex-1 overflow-y-auto py-2 px-2 bg-midground"></div>
		<VoiceStatusFooter />
	</div>
</template>

<style>
.discovery-header-shadow {
	box-shadow: 0 1px 0 hsla(0, 0%, 0.8%, 0.2), 0 1.5px 0 hsla(240, 7.7%, 2.5%, 0.05), 0 2px 0 hsla(0, 0%, 0.8%, 0.05);
}
</style>