<script lang="ts" setup>
import DiscoveryHeader from '@/components/discovery/DiscoveryHeader.vue';
import SideDiscovery from '@/layouts/side-discovery/SideDiscovery.vue';
import ServerCardItem from '@/components/discovery/ServerCardItem.vue';
</script>

<template>
	<SideDiscovery/>
	<div class="flex grow flex-col h-full relative">
		<div class="flex grow h-full flex-col justify-start items-center p-8 gap-12 overflow-scroll">
			<DiscoveryHeader/>
			<div class="discovery-grid w-full gap-3">
				<ServerCardItem
					v-for="(n, index) in [1,2,3,4,5,6]"
					:image="`https://picsum.photos/720?random=${n * (index * 10)}`"
					name="test"
				/>
			</div>
		</div>
	</div>
</template>

<style>
.discovery-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill,minmax(248px,1fr));
}
</style>