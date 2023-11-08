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
					<div class="flex flex-grow pt-[13px] pb-[12px]">
						<textarea
							id="send-message"
							class="bg-transparent select-none border-none outline-none resize-none w-full flex-grow text-xs max-h-[45vh] block h-4 text-white"
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

<style>
.discoding-icon, .discoding-user-icon {
    width: 32px;
    height: 32px;
    min-height: 32px;
    min-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.discoding-editable-area-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 50vh;
    min-height: 3rem;
    bottom: 0;
    padding-bottom: 1.25rem;
    background-color: #313338;
}

.discoding-editable-area {
    width: 98%;
    min-height: 2.75rem;
    padding: 0 5rem 0 .5rem;
    background-color: rgb(56,58,64);
    display: flex;
    gap: .5rem;
    align-items: center;
}

.discoding-editable-area-input {
    background-color: transparent;
    user-focus: none;
    border: none;
    outline: none;
    resize: none;
    width: 100%;
    height: 24px;
    flex-grow: 1;
    font-size: 13px;
    max-height: 45vh;
}

.discoding-editable-area-input::placeholder {
    opacity: .5;
}
</style>