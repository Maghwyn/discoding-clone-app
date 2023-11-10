import { computed } from "vue";
import type { Socket } from "socket.io-client";

import { useMessagesStore } from "@/stores/messages.store";
import { useDirectMessagesStore } from "@/stores/direct-messages.store";
import type { Message, MessageDelete, MessageUpdate } from "@/api/messages.req.type";


export const handleSocketMessagesEvents = (socket: Socket) => {
	const messageStore = useMessagesStore();
	const directMessage = useDirectMessagesStore();
	const activeChannelId = computed(() => directMessage.active);

	socket.on('message-received', (message: Message) => {
		console.log(activeChannelId.value === message.channelId)
		if (activeChannelId.value === message.channelId) {
			console.log("message-pushed")
			messageStore.messages.push(message);
		} else if (!message.isOwner) {
			console.log("message-unread")
			messageStore.unreads.push(message);
		}
	})

	socket.on('message-updated', (message: MessageUpdate) => {
		const index = messageStore.messages.findIndex((m) => m.id === message.id);
		if (index === -1) return;
		
		messageStore.messages[index].content = message.content;
		messageStore.messages[index].isEdited = true;
	})

	socket.on('message-deleted', (message: MessageDelete) => {
		const index = messageStore.messages.findIndex((m) => m.id === message.id);
		if (index === -1) return;

		messageStore.messages.splice(index, index + 1);
	})
}