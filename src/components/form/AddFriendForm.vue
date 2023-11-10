<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

import { createOrUpdateRelation } from "@/api/relationship.req";
import { useToastStore } from '@/stores/toast.store';
import { RelationType } from "@/api/relationship.req.type";

const toastStore = useToastStore();
const username = ref("");

const sendFriendRequest = async () => {
	if (username.value !== "") {
		try {
			await createOrUpdateRelation({
				username: username.value,
				type: RelationType.FRIEND,
			})

			toastStore.showSuccessToast(username.value + " is now your friend !")
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
			<form class="container-form" @submit.prevent="sendFriendRequest" autocomplete="off">
				<span class="modal-close" @click="closeSwalInstance">X</span>
				<div class="centering-wrapper">
					<div class="">
						<div class="primary-header">Add friend</div>
						<div class="input-position">
							<div class="form-group">
								<input autocomplete="false" name="hidden" type="text" style="display:none;">
								<div class="input-placeholder" id="email-txt">You can add friends with discord username<span class="error-message"></span></div>
								<input required="true" placeholder="Type a username" name="friendUsername" v-model="username" class="form-style" id="friendUesrnameId" style="margin-bottom: 20px;">
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