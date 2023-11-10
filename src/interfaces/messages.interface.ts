import type { Message } from "@/api/messages.req.type";

export interface MessagesStore {
	lastEditId: string;
	messages: Array<Message>
	unreads: Array<Message>;
	searchResult: Array<Message>;
}

export type UnreadMessageGroup = {
	id: string;
	username: string;
	userPicture: string;
	channelId: string;
	notificationCount: number;
}