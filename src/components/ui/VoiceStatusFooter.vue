<script lang="ts" setup>
import { computed, ref } from 'vue';
import IconMic from '@/components/icons/IconMic.vue';
import IconHeadphones from '@/components/icons/IconHeadphones.vue';
import IconGear from '@/components/icons/IconGear.vue';
import IconDiscord from '@/components/icons/IconDiscord.vue';
import { useUsersStore } from '@/stores/users.store';
import IconDisconnect from "@/components/icons/IconDisconnect.vue";
import { logoutUser } from "@/api/auth.req";
import Popper from "@/components/ui/Popper.vue";
import { test } from "vitest";
import router from "@/router";

const userStore = useUsersStore();
const user = computed(() => userStore.user);

const deafen = ref(false);
const muted = ref(false);

const setMute = (b: boolean) => {
	muted.value = b;

	if (!muted.value && deafen.value) {
		deafen.value = false;
	}
}

const setDeafen = (b: boolean) => {
	deafen.value = b;
	muted.value = b;
}

async function logout(){
  await logoutUser()
  window.location.reload()
}
</script>

<template>
	<div class="flex justify-between gap-1 bg-semibackground px-2 py-1.5">
		<button class="flex gap-2 rounded-md py-1 w-[120px] max-w-[120px] pl-0.5 pr-2 text-left leading-tight hover:bg-[#4E505899] overflow-hidden">
			<img
				v-if="user.pictureUrl"
				:src="user.pictureUrl"
				alt="xxx"
				width="32"
				height="32"
				class="inset-0 z-0 rounded-[50%]"
			/>
			<div v-else class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%] bg-pink-400 text-white">
				<IconDiscord width="20" height="20"/>
			</div>
			<div>
				<div class="text-xs text-white whitespace-nowrap overflow-ellipsis overflow-hidden block">{{ user.username }}</div>
				<div class="text-[11px] font-light text-[#949ba4] whitespace-nowrap overflow-ellipsis overflow-hidden block">
					Do Not Disturb
				</div>
			</div>
		</button>
		<div class="flex items-center">
			<button
				class="group relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#4E505899] text-[#949ba4]"
				@click="setMute(!muted)"
			>
				<IconMic width="20" height="20"/>
				<div v-if="muted" class="absolute h-3/4 w-[5px] rotate-45 rounded-sm border-[2px] border-semibackground bg-red-500 group-hover:border-[#3a3c42]"></div>
			</button>
			<button
				class="group relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#4E505899] text-[#949ba4]"
				@click="setDeafen(!deafen)"
			>
				<IconHeadphones width="20" height="20"/>
				<div v-if="deafen" class="absolute h-3/4 w-[5px] rotate-45 rounded-sm border-[2px] border-semibackground bg-red-500 group-hover:border-[#3a3c42]"></div>
			</button>
        <button class="group relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#4E505899] text-[#949ba4]" @click="logout()">
          <IconDisconnect height="20" width="20"/>
        </button>
		</div>
	</div>
</template>