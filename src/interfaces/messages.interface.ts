import type { Message } from "@/api/messages.req.type";

export interface MessagesStore {
	lastEditId: string;
	messages: Array<Message>
}