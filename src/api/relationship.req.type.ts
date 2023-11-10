export type FriendEmail = {
    email: string
}

export type RelationPayload = {
	username: string;
	type: RelationType;
}

export enum RelationType {
	PENDING = 0,
	FRIEND = 1,
	BLOCKED = 2,
}

export type Relation = {
	channelId: string;
	userId: string;
	userPicture: string;
	username: string;
}