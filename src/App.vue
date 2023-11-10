<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'

</script>

<template>
	<router-view v-slot="{ Component }">
		<transition name="fade">
			<component :is="Component" />
    </transition>
    <ModalsContainer></ModalsContainer>
  </router-view>
</template>