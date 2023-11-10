import { http } from "@/api/network/axios";
import type { Server, ServerCreate, ServerUpdate } from "@/api/server.req.type";
import type { Serv } from "@/interfaces/server.interface";

export const getAllServers = () => {
return http.get<Array<Serv>>('/servers');
}
export const getUserServers = () => {
    return http.get<Array<Serv>>('/servers/me');
}

export const addNewServer = (server : ServerCreate) => {
    return http.post('/servers', server)
}

export const deleteServer = (serverId : string) => {
    return http.delete('/servers/'+ serverId)
}

export const updateServer = (server : ServerUpdate) => {
    return http.put('/servers', server)
}