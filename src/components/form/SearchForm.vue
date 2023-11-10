<script setup lang="ts">
import {computed, ref} from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import {searchForChannelAndUser} from "@/api/search.req";
import IconDiscord from '@/components/icons/IconDiscord.vue';

const router = useRouter();
const inputSearch = ref("")
const channelsAndUsers = ref({})

searchForChannelAndUser().then(
	(res) => {
		channelsAndUsers.value = res.data
	}
)

const redirect = (item: any) => {
	if (item["username"]) {
		console.log(item)
	} else {
		Swal.close()
		router.push({path: '/app/channels/'+item["channelId"]})
		console.log(item)
	}
}

const filteredChannels = computed(() => {
	if (!channelsAndUsers.value) return [];

	// combine channels and users into a single array
	if (channelsAndUsers.value !== null && Object.keys(channelsAndUsers.value).length !== 0) {
		const allItems = [...channelsAndUsers.value["channels"], ...channelsAndUsers.value["users"]];

		return allItems.filter(item => {
			if (item.channelName) {
				return item.channelName.toLowerCase().includes(inputSearch.value.toLowerCase());
			} else if (item.username) {
				return item.username.toLowerCase().includes(inputSearch.value.toLowerCase());
			}

			return true;
		});
	}
});

const closeSwalInstance = () => {
	Swal.close()
}
</script>

<template>
	<div class="modal-container w-[40rem]">
		<div class="position">
			<form class="container-form w-full flex items-center justify-center">
				<span class="modal-close" @click="closeSwalInstance">X</span>
				<div class="centering-wrapper">
					<div class="w-full">
						<div class="primary-header">Search</div>
						<div class="input-position w-full">
							<div class="form-group w-full">
								<input autocomplete="false" name="hidden" type="text" style="display:none;">
								<div class="input-placeholder" id="email-txt">Search channel or user<span class="error-message" id="email-error"></span></div>
								<input type="text" required="true" name="friendUsername" v-model="inputSearch" class="form-style" id="friendUesrnameId" autocomplete="off" style="margin-bottom: 20px;">
								<i class="input-icon uil uil-at"></i>
							</div>
						</div>
						<div class="search-results">
							<ul>
								<li
									class="cursor-pointer"
									@click="redirect(item)"
									v-for="item in filteredChannels"
									:key="item.channelName || item.username"
								>
									<div v-if="item.channelName" class="group rounded text-[#949ba4] hover:text-white hover:bg-[#4E50584D] py-2.5">
										<div class="flex min-w-0 flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden items-center text-inherit">
											<span class="text-white"># {{ item.channelName }}</span>
										</div>
									</div>
									<div class="group rounded text-[#949ba4] hover:text-white hover:bg-[#4E50584D]">
										<div class="flex min-w-0 flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden items-center text-inherit">
											<div class="grow min-w-[0px] flex items-center rounded px-2 h-[42px]">
												<div class="flex items-center w-8 h-8 mr-3">
													<img
														v-if="item.avatarUrl"
														:src="item.avatarUrl"
														alt="xxx"
														width="32"
														height="32"
														class="inset-0 z-0 rounded-[50%]"
													/>
													<div v-else class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%] bg-pink-400 text-white">
														<IconDiscord width="20" height="20"/>
													</div>
												</div>
												<div class="flex-auto min-w-[0px] whitespace-nowrap text-ellipsis overflow-hidden">
													<div class="flex justify-start items-center">
														<span class="text-base text-white font-medium leading-5 text-[16px] whitespace-nowrap overflow-hidden overflow-ellipsis flex-shrink-0">
															{{ item.username }}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>