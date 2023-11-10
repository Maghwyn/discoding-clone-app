import { http } from "@/api/network/axios";

export const searchForChannelAndUser = () => {
    return http.get('/channels/searchChannelsAndUsers')
}