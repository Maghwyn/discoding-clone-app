<script lang="ts" setup>
import { ref, watch, computed, nextTick } from 'vue';
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import { formatDateHM, formatDateYMDHM } from '@/utils/date.helper';
import { editMessage } from '@/api/messages.req';
import { deletePrivateMessage } from '@/api/messages.req';
import { useMessagesStore } from '@/stores/messages.store';
import Swal from 'sweetalert2';

const props = defineProps<{
	messageId: string;
	userPicture: string;
	username: string;
	content: string;
	createdAt: string;
	isFollowup: boolean;
	canEdit: boolean;
	canDelete: boolean;
}>();

const messagesStore = useMessagesStore();
const lastEditId = computed(() => messagesStore.lastEditId);

watch(lastEditId, value => {
	if (value !== props.messageId) {
		isEditMode.value = false;
	}
})

const isEditMode = ref(false);
const openEditMode = () => {
	isEditMode.value = true;
	messagesStore.lastEditId = props.messageId;
	temporaryInput.value.value = props.content;
	nextTick(() => {
		onInput()
	})
}
const closeEditMode = () => {
	isEditMode.value = false;
}

const temporaryInput = ref<HTMLTextAreaElement>();
const onInput = () => {
	temporaryInput.value.style.height = "";
	temporaryInput.value.style.height = temporaryInput.value.scrollHeight + "px";
}

const listenKeyPress = async (event: KeyboardEvent) => {
	if (event.shiftKey) return;

	if (event.key === 'Enter') {
		event.preventDefault();
		return confirmEditMessage();
	}

	if (event.key === 'Escape') {
		event.preventDefault();
		return closeEditMode();
	}
}

const confirmEditMessage = async () => {
	const content = temporaryInput.value.value;

	if (content === props.content) {
		return closeEditMode();
	}

	if (content === "") {
		await supressMessage();
		return closeEditMode();
	}

	try {
		await editMessage(props.messageId, content);
		return closeEditMode();
	} catch(err) {
		console.error(err);
	}
}

const supressMessage = async () => {
	Swal.fire({
		title: 'Delete message ',
		text: 'Are you sure you want to delete this message ?',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: 'gray',
		confirmButtonText: 'Delete',
		cancelButtonText: 'Cancel',
		reverseButtons: true
	}).then(async (result) => {
		if (result.isConfirmed) {
			try {
				await deletePrivateMessage(props.messageId);
			} catch(err) {
				console.error(err);
			}
		}
	});
}
</script>

<template>
	<div class="w-full px-4 message-wrapper" :class="{ 'mt-3': !isFollowup }">
		<div class="w-full flex py-0.5 gap-3 justify-center transition duration-200 relative message-container">
			<div v-if="!isEditMode" class="message-menu absolute hidden justify-center items-center cursor-pointer right-[10px] top-[-10px] text-[14px] rounded-md bg-[#2e3035] border border-[#26282c] text-[#949ba4]">
				<div v-if="canEdit" class="px-1.5 py-1 flex items-center justify-center">
					<IconEdit @click="openEditMode" width="18" height="18" class="hover:text-orange-500"/>
				</div>
				<div v-if="canDelete" class="px-1.5 py-1 flex items-center justify-center">
					<IconDelete @click="supressMessage" width="18" height="18"  class="hover:text-red-500"/>
				</div>
			</div>
			<template v-if="!isFollowup">
				<div v-if="userPicture" class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%]">
					<img
						:src="userPicture"
						alt="xxx"
						width="32"
						height="32"
						class="inset-0 z-0 rounded-[50%]"
					/>
				</div>
				<div v-else class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%] bg-pink-400 text-white">
					<IconDiscord width="20" height="20"/>
				</div>
			</template>
			<div v-else class="flex items-center justify-center text-[7px] text-[#949ba4] leading-none w-8 min-w-[32px] message-sm-date">
				<span class="hidden">{{ formatDateHM(new Date(createdAt)) }}</span>
			</div>
			<div class="flex flex-col grow gap-0.5">
				<div v-if="!isFollowup" class="flex gap-2 items-end">
					<span class="leading-none text-[13px] font-bold text-white">{{ username }}</span>
					<span class="text-[10px] text-[#949ba4] leading-none">{{ formatDateYMDHM(new Date(createdAt)) }}</span>
				</div>
				<div v-if="!isEditMode" class="text-[12px] text-white font-light">
					{{ content }}
				</div>
				<div v-show="isEditMode" class="my-1 flex flex-col">
					<textarea
						id="edit-message"
						class="bg-[#383a3f] p-3 select-none border-none outline-none resize-none w-full grow text-xs max-h-[45vh] h-8 block text-white rounded-[8px]"
						ref="temporaryInput"
						@input="onInput"
						@keydown="listenKeyPress"
					></textarea>
					<div>
						<span class="text-white font-light text-[10px]">escape to <span class="text-red-400 hover:underline cursor-pointer" @click="closeEditMode">cancel</span> • </span>
						<span class="text-white font-light text-[10px]">enter to <span class="text-blue-400 hover:underline cursor-pointer" @click="confirmEditMessage">save</span></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.message-wrapper:hover {
	background-color: #2e3035;
	transition: background-color 0s !important;
}

.message-container:hover > .message-menu {
	display: flex !important;
}

.message-container:hover > .message-sm-date > span {
	display: flex !important;
}
</style>