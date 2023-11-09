import { http } from "@/api/network/axios";
import type { CreatePrivateMessagePayload } from "@/api/messages.req.type";

export const sendPrivateMessage = (payload: CreatePrivateMessagePayload) => {
	return http.post('/messages/private', payload);
} 

export const deletePrivateMessage = (messageId: string) => {
	return http.delete(`/messages/private/${messageId}`);
}

export const editMessage = (messageId: string, content: string) => {
	return http.patch(`/messages/${messageId}`, { content });
}