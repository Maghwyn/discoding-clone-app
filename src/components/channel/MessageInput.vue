<script lang="ts" setup>
import { ref } from 'vue';
import IconRoundPlus from '@/components/icons/IconRoundPlus.vue';

const inputArea = ref<HTMLTextAreaElement>();
const onInput = () => {
	console.log(inputArea.value)
	inputArea.value.style.height = "";
	inputArea.value.style.height = inputArea.value.scrollHeight + "px";
}
</script>

<template>
	<div class="px-4 mt-[-8px] bottom-0 w-full">
		<div class="relative w-full text-left rounded-[8px] mb-[24px]">
			<div class="overflow-x-hidden overflow-y-scroll max-h-1/2 rounded-[8px] backface-hidden">
				<label for="send-message" class="w-full min-h-[44px] max-h-[50vh] px-4 bg-gray-900 flex">
					<div class="h-auto flex items-start justify-center">
						<div class="h-full pr-3 py-3 text-[#949ba4]">
							<IconRoundPlus/>
						</div>
					</div>
					<div class="flex grow pt-[13px] pb-[12px]">
						<textarea
							id="send-message"
							class="bg-transparent select-none border-none outline-none resize-none w-full grow text-xs max-h-[45vh] block h-4 text-white"
							placeholder="Message #RandomGuy"
							ref="inputArea"
							@input="onInput"
						></textarea>
					</div>
					<div class="h-auto flex items-start justify-center">
						<div class="w-10 max-w-[40px] py-3 pl-3 flex justify-center items-center text-[#949ba4]">
							<IconRoundPlus/>
						</div>
					</div>
				</label>
			</div>
		</div>
	</div>
</template>