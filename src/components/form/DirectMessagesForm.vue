<script setup lang="ts">
import Swal from 'sweetalert2';
import { ref, computed } from 'vue';
import type { Router } from 'vue-router';
import { AxiosError } from 'axios';

import { useToastStore } from '@/stores/toast.store';
import SearchInput from '@/components/ui/SearchInput.vue';
import { useRelationshipStore } from '@/stores/relationship.store';
import IconDiscord from '@/components/icons/IconDiscord.vue';
import { createEmptyDirectMessage } from '@/api/conversations.req';
import { useDirectMessagesStore } from '@/stores/direct-messages.store';

const props = defineProps<{
	router: Router
}>()

const filter = ref();
const directMessagesStore = useDirectMessagesStore();
const relationshipStore = useRelationshipStore();
const toastStore = useToastStore();

const createDirectMessage = async (userId: string) => {
	try {
		const res = await createEmptyDirectMessage(userId);
		directMessagesStore.addChannel(res.data);
		directMessagesStore.active = res.data.id;
		props.router.push(`/app/channels/${res.data.id}`);
		Swal.close();
	} catch(err) {
		if (err instanceof AxiosError) {
			toastStore.showErrorToast(err.response.data.error);
		}
	}
}

const relationships = computed(() => relationshipStore.filteredFriends(filter.value));
const searchRelation = (username: string) => {
	filter.value = username;
}

const closeSwalInstance = () => {
	Swal.close()
}
</script>

<template>
	<div class="modal-container">
		<div class="position">
			<div class="container-form w-full">
				<span class="modal-close" @click="closeSwalInstance">X</span>
				<div class="centering-wrapper">
					<div class="">
						<div class="primary-header">Create DM</div>
						<div class="input-position">
							<div class="form-group flex flex-col gap-3">
								<input autocomplete="false" name="hidden" type="text" style="display:none;">
								<SearchInput
									class="w-[30rem]"
									placeholder="Type the username of a friend"
									@search="searchRelation"
								/>
								<ul v-if="relationships.length > 0" class="relative flex flex-1 flex-col min-h-0 min-w-0 z-0 overflow-scroll w-full">
									<li v-for="(relation) in relationships" class="rounded-md overflow-hidden grow">
										<div class="group flex justify-between border-t-[1px] border-gray-800 hover:bg-gray-800 py-2.5 p-3">
											<div className="flex items-center gap-3">
												<img
													v-if="relation.userPicture"
													:src="relation.userPicture"
													alt="xxx"
													width="32"
													height="32"
													class="inset-0 z-0 rounded-[50%]"
												/>
												<div v-else class="flex items-center justify-center w-7 h-7 min-w-[28px] rounded-[50%] bg-pink-400 text-white">
													<IconDiscord width="18" height="18"/>
												</div>

												<div class="flex-1 leading-4">
													<div className="flex items-center gap-1.5 text-sm text-gray-200">
														<span className="font-semibold">{{ relation.username || "unknown" }}</span>
														<span className="hidden text-xs text-gray-400 group-hover:block">
															{{ "unknown" }}
														</span>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2.5">
												<button @click="createDirectMessage(relation.userId)" class="flex items-center justify-center h-6 min-w-[32px] bg-[#7289d9] hover:bg-[#677bc4] text-white text-[12px] px-2 rounded">
													Create
												</button>
											</div>
										</div>
									</li>
								</ul>
								<div v-else class="w-full flex items-start justify-center pt-4">
									<img src="/search.svg" class="grayscale" width="200" height="200">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>