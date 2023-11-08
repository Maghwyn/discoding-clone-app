<script lang="ts" setup>
import SideMenu from '@/layouts/side-menu/SideMenu.vue';
</script>

<template>
	<SideMenu />
	<div id="content" class="ml-[70px]">
		<router-view />
	</div>
</template>