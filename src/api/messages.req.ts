import { http } from "@/api/network/axios";
import type { CreatePrivateMessagePayload, Message, MessageContext } from "@/api/messages.req.type";
import type { DirectMessages } from "@/api/conversations.req.type";

export const sendPrivateMessage = (payload: CreatePrivateMessagePayload) => {
	return http.post<DirectMessages>('/messages/private', payload);
} 

export const deletePrivateMessage = (messageId: string, contextId: string) => {
	return http.post(`/messages/private/delete/${messageId}`, { contextId });
}

export const editMessage = (messageId: string, contextId: string, content: string) => {
	return http.patch(`/messages/${messageId}`, { contextId, content });
}

export const retrieveChannelMessages = (channelId: string, context: MessageContext) => {
	return http.get<Array<Message>>(`/messages/channel/${channelId}?context=${context}`);
}

export const retrieveUnreadsMessage = () => {
	return http.get<Array<Message>>('/messages/private/unreads');
}

export const searchMessages = (channelId: string, query: string) => {
	return http.get<Array<Message>>(`/messages/search/${channelId}?q=${query}`);
}