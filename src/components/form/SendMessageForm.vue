<script setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

import { useToastStore } from '@/stores/toast.store';
import { sendPrivateMessage } from '@/api/messages.req';
import type { Router } from 'vue-router';

const props = defineProps<{
	name: string;
	interlocutorId: string;
	router: Router; // Need the instance, vue router is undefined inside hypescript
}>()

const toastStore = useToastStore();
const message = ref("");

const sendFirstMessage = async () => {
	const data = message.value.trim();
	if (data !== "") {
		try {
			const res = await sendPrivateMessage({
				content: data,
				contextId: props.interlocutorId,
			})
			
			props.router.push(`/app/channels/${res.data}`);
			Swal.close();
		} catch(err) {
			if (err instanceof AxiosError) {
				toastStore.showErrorToast(err.response.data.error);
			}
		}
	}
}

const closeSwalInstance = () => {
	Swal.close()
}
</script>

<template>
	<div class="modal-container">
		<div class="position">
			<form class="container-form" @submit.prevent="sendFirstMessage" autocomplete="off">
				<span class="modal-close" @click="closeSwalInstance">X</span>
				<div class="centering-wrapper">
					<div class="">
						<div class="primary-header">Send your first message to {{ name }} !</div>
						<div class="input-position">
							<div class="form-group">
								<input autocomplete="false" name="hidden" type="text" style="display:none;">
								<div class="input-placeholder" id="message-txt">Message<span class="error-message"></span></div>
								<input required="true" placeholder="@message" name="message" v-model="message" class="form-style" id="new-message" style="margin-bottom: 20px;">
								<i class="input-icon uil uil-at"></i>
							</div>
						</div>
						<div class="btn-position">
							<button class="btn">Send</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>