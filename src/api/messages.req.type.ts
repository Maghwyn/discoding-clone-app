export type CreatePrivateMessagePayload = {
	contextId: string;
	content: string
}

export type Message = {
	id: string;
	isOwner: boolean;
	userId: string;
	userPicture: string;
	username: string;
	content: string;
	channelId: string;
	isEdited: boolean;
	isBlocked: boolean;
	createdAt: string;
}

export type MessageUpdate = {
	id: string;
	content: string;
}

export interface MessageDelete {
	id: string;
}

export enum MessageContext {
	CHANNEL = 1,
	CONVERSATION = 2,
}
