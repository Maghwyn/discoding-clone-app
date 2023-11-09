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
	isEdited: boolean;
	isBlocked: boolean;
	createdAt: string;
}

export enum MessageContext {
	CHANNEL = 1,
	CONVERSATION = 2,
}
