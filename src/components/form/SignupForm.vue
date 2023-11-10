<script setup lang="ts">
import {ref} from "vue";
import { useRouter } from 'vue-router';
import { AxiosError } from 'axios';

import { useToastStore } from '@/stores/toast.store';
import { signupUser } from "@/api/auth.req";

const router = useRouter();
const toastStore = useToastStore();

const pseudoSignup = ref("")
const emailSignup = ref("")
const passwordSignup = ref("")

const trySignup = async () => {
	try {
		await signupUser({
			email: emailSignup.value,
			password: passwordSignup.value,
			username: pseudoSignup.value
		});

		toastStore.validationFromSignup = true;
		toastStore.messageContent = "Welcome " + pseudoSignup.value;
		router.push({path: '/signin'})
	} catch(err) {
		if(err instanceof AxiosError) {
			toastStore.showErrorToast(err?.response?.data?.message[0]);
		}
	}
}
</script>

<template>
	<div class="position-auth">
		<form class="container-form w-[30rem] !flex" @submit.prevent="trySignup">
			<div class="centering-wrapper">
				<div class="section1 text-center">
					<div class="primary-header">Welcome aboard !</div>
					<div class="secondary-header">We're so excited to see you !</div>
					<div class="input-position w-full">
						<div class="form-group">
							<label for="signupPseudo" class="input-placeholder" id="pseudo-txt">Pseudo<span class="error-message" id="pseudo-error"></span></label>
							<input type="pseudo" v-model="pseudoSignup" required="true" name="signupPseudo" class="form-style" id="signupPseudo" autocomplete="off" style="margin-bottom: 20px;">
							<i class="input-icon uil uil-at"></i>
						</div>
						<div class="form-group">
							<label for="signupEmail" class="input-placeholder" id="email-txt">Email<span class="error-message" id="email-error"></span></label>
							<input type="email" v-model="emailSignup" required="true" name="signupEmail" class="form-style" id="signupEmail" autocomplete="off" style="margin-bottom: 20px;">
							<i class="input-icon uil uil-at"></i>
						</div>
						<div class="form-group">
							<label for="signupPass" class="input-placeholder" id="pword-txt">Password<span class="error-message" id="password-error"></span></label>
							<input type="password" v-model="passwordSignup" required="true" name="signupPass" class="form-style" id="signupPass" autocomplete="on">
							<i class="input-icon uil uil-lock-alt"></i>
						</div>
					</div>
					<div class="password-container">
						<router-link class="link" to="/signin"> Already have an account ? </router-link>
					</div>
					<div class="btn-position">
						<button type="submit" class="btn">Sign up</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>