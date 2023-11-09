<script lang="ts" setup>
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconMessage from '@/components/icons/IconMessage.vue';

defineProps<{
	goto: string;
	username: string;
	userPicture?: string;
	discriminator?: string;
}>();
</script>

<template>
	<li class="mr-[20px] ml-[30px] rounded-md overflow-hidden">
		<router-link class="group flex justify-between border-t-[1px] border-gray-800 hover:bg-gray-800 py-2.5 pr-3" :to="goto">
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
				<div class="flex items-center justify-center w-8 h-8 min-w-[32px] rounded-[50%] bg-background text-white">
					<IconMessage width="20" height="20"/>
				</div>
			</div>
		</router-link>
	</li>
</template>