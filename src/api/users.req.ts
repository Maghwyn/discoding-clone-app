import { http } from "@/api/network/axios";
import type { User } from "@/api/users.req.type";

export const retrieveUser = () => {
	return http.get<User>('/users/me');
}