import type { Relation } from "@/api/relationship.req.type";

export interface RelationshipStore {
	friends: Array<Relation>;
	blocked: Array<Relation>;
	friendUsernameFilter: string;
	blockedUsernameFilter: string;
}