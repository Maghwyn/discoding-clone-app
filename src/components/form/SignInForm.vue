<script lang="ts" setup>
import {ref} from "vue";
import { useRouter } from 'vue-router';

import { useToastStore } from '@/stores/toast.store';
import { signinUser } from "@/api/auth.req";
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const toastStore = useToastStore();
const authStore = useAuthStore();

const emailSignin = ref("");
const passwordSignin = ref("");

const trySignin = async () => {
	try {
		await signinUser({
			email: emailSignin.value,
			password: passwordSignin.value,
		});

		authStore.isAuth = true;
		router.push({ path: '/app/channels/me' });
	} catch(err) {
		toastStore.showErrorToast("Email or password is invalid")
	}
}
</script>


<template>
	<div class="position-auth">
		<form class="container-form" @submit.prevent="trySignin">
			<div class="centering-wrapper">
				<div class="section1 text-center">
					<div class="primary-header">Welcome back !</div>
					<div class="secondary-header">We're so excited to see you again!</div>
					<div class="input-position">
						<div class="form-group">
							<label for="logemail" class="input-placeholder" id="email-txt">Email<span class="error-message" id="email-error"></span></label>
							<input type="email" v-model="emailSignin" required="true" name="logemail" class="form-style" id="logemail" autocomplete="off" style="margin-bottom: 20px;">
							<i class="input-icon uil uil-at"></i>
						</div>
						<div class="form-group">
							<label for="logpass" class="input-placeholder" id="pword-txt">Password<span class="error-message" id="password-error"></span></label>
							<input type="password" v-model="passwordSignin" required="true" name="logpass" class="form-style" id="logpass" autocomplete="on">
							<i class="input-icon uil uil-lock-alt"></i>
						</div>
					</div>
					<div class="password-container">
						<router-link class="link" to="/signup"> Don't have an account ? </router-link>
					</div>
					<div class="btn-position">
						<button type="submit" class="btn">Sign in</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>