import { http } from "@/api/network/axios";
import type { Relation, RelationPayload, RelationType } from "@/api/relationship.req.type";

export const createOrUpdateRelation = (payload: RelationPayload) => {
	return http.post('/relationships', payload);
}

export const retrieveRelationList = (type: RelationType) => {
	return http.get<Array<Relation>>(`/relationships?type=${type}`);
}

export const retrieveRelationListWIP = (type: RelationType, username?: string) => {
	return http.get<Array<Relation>>(`/relationships?type=${type}&username=${username || ''}`);
}