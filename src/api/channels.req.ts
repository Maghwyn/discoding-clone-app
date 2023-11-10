import { http } from "@/api/network/axios";
import type { Channel } from "@/interfaces/channel.interface";
import type { ChannelCreate, ChannelUpdate } from "@/api/channels.req.type";

export const getServerChannels = (serverId : string) => {
    return http.get<Array<Channel>>('/channels/'+serverId);
}

export const addNewChannel = (channel : ChannelCreate) => {
    return http.post('/channels', channel)
}

export const deleteChannel = (channelId : string) => {
    return http.delete('/channels/'+ channelId)
}

export const updateChannel = (channel : ChannelUpdate) => {
    return http.put('/servers', channel)
}