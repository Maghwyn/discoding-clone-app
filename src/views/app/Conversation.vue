<script lang="ts" setup>
import SideConversation from '@/layouts/side-conversation/SideConversation.vue';
import ChannelHeader from '@/components/channel/ChannelHeader.vue';
import MessageInput from '@/components/channel/MessageInput.vue';
</script>

<template>
	<SideConversation/>
	<div class="flex flex-grow flex-col h-full overflow-scroll relative">
		<ChannelHeader/>
		<div class="relative flex flex-1 min-h-0 min-w-0 z-0"></div>
		<MessageInput/>
	</div>
</template>