import { http } from "@/api/network/axios";
import type { CreatePrivateMessagePayload, Message, MessageContext } from "@/api/messages.req.type";
import type { ConversationId } from "@/api/conversations.req.type";

export const sendPrivateMessage = (payload: CreatePrivateMessagePayload) => {
	return http.post<ConversationId>('/messages/private', payload);
} 

export const deletePrivateMessage = (messageId: string) => {
	return http.delete(`/messages/private/${messageId}`);
}

export const editMessage = (messageId: string, content: string) => {
	return http.patch(`/messages/${messageId}`, { content });
}

export const retrieveChannelMessages = (channelId: string, context: MessageContext) => {
	return http.get<Array<Message>>(`/messages/channel/${channelId}?context=${context}`);
}