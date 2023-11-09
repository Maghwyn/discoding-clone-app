import { http } from "@/api/network/axios";
import type { DirectMessages } from "@/api/conversations.req.type";

export const retrieveDirectMessages = () => {
	return http.get<Array<DirectMessages>>('/conversations');
} 