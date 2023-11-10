import { http } from "@/api/network/axios";

export const addNewFriend = (friendPseudo: {username : string}) => {
    return http.post('/relationships/addFriend', friendPseudo)
}