<script lang="ts" setup>
import SideMenu from '@/layouts/side-menu/SideMenu.vue';
</script>

<template>
	<!-- <Suspense> -->
		<SideMenu />
		<slot/>
	<!-- </Suspense> -->
	<!-- <SearchModal /> -->
</template>