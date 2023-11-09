import type { DirectMessages } from "@/api/conversations.req.type";

export interface DirectMessagesStore {
	channels: Array<DirectMessages>;
	active: string;
}