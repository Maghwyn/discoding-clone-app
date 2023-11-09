import { http } from "@/api/network/axios";

export const addNewFriend = (friendPseudo : object) => {
    return http.post('/relationships/addFriend', friendPseudo)
}