<script lang="ts" setup>
import { useToastStore } from '@/stores/toast.store';
import SignInForm from "@/components/form/SignInForm.vue";

const alert = useToastStore();
if (alert.validationFromSignup) {
	setTimeout(function() {
		alert.showSuccessToast(alert.messageContent)
		alert.validationFromSignup = false
	}, 500)
}
</script>

<template>
	<div class="container-signin-form">
		<SignInForm />
	</div>
</template>

<style>
.container-signin-form {
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