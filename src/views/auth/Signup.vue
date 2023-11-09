<script setup lang="ts">
import SignupForm from "@/components/form/SignupForm.vue";
</script>

<template>
	<div class="container-signup-form">
		<SignupForm />
	</div>
</template>

<style>
.container-signup-form {
	width: 100vw;
	height: 100vh;
	background-image: url("/discord-background.png");
	background-size: cover;
	background-repeat: no-repeat;
	font-family: 'Whitney', sans-serif;
	text-rendering: optimizeLegibility;
	user-select: none;
}
</style>