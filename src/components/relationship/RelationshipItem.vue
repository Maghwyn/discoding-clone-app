<script lang="ts" setup>
import { h, render } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconMessage from '@/components/icons/IconMessage.vue';
import SendMessageForm from '@/components/form/SendMessageForm.vue';

const router = useRouter();

const props = defineProps<{
	goto: string;
	channelId: string;
	userId: string;
	username: string;
	userPicture?: string;
	discriminator?: string;
}>();

const openModal = () => {
	Swal.fire({
		html: '<div id="VueSweetAlert2"></div>',
		showConfirmButton: false,
		background: 'transparent',
		willOpen() {
			const vnode = h(SendMessageForm, {
				interlocutorId: props.userId,
				name: props.username,
				router: router
			});
			const el = document.createElement("div");
			render(vnode, el);
			document.getElementById('VueSweetAlert2').appendChild(el);
		},
	})
}
</script>

<template>
	<li class="mr-[20px] ml-[30px] rounded-md overflow-hidden">
		<component :is="channelId ? RouterLink : 'div'" class="group flex justify-between border-t-[1px] border-gray-800 hover:bg-gray-800 py-2.5 p-3" :to="goto">
			<div className="flex items-center gap-3">
				<img
					v-if="userPicture"
					:src="userPicture"
					alt="xxx"
					width="32"
					height="32"
					class="inset-0 z-0 rounded-[50%]"
				/>
				<div v-else class="flex items-center justify-center w-6 h-6 min-w-[24px] rounded-[50%] bg-pink-400 text-white">
					<IconDiscord width="14" height="14"/>
				</div>

				<div class="flex-1 leading-4">
					<div className="flex items-center gap-1.5 text-sm text-gray-200">
						<span className="font-semibold">{{ username || "unknown" }}</span>
						<span className="hidden text-xs text-gray-400 group-hover:block">
							{{ discriminator || "unknown" }}
						</span>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2.5">
				<div v-if="channelId" class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%] bg-background text-white">
					<IconMessage width="20" height="20"/>
				</div>
				<button v-else @click="openModal" class="flex items-center justify-center h-6 min-w-[32px] bg-[#7289d9] hover:bg-[#677bc4] text-white text-[12px] px-2 rounded">
					Send message
				</button>
			</div>
		</component>
	</li>
</template>