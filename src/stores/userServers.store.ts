import { defineStore } from 'pinia';

import { type Serv } from '@/interfaces/server.interface'
import { ref } from "vue";

export const userServersStore = defineStore('server',() => {
    const servers : Array<Serv> = ref([])

    function addUserServer (server : Serv){
        servers.value.push(server)
    }

    function addUserServers (servs: Array<Serv>){
        servers.value = servs
    }

    function deleteUserServer (server : Serv) {
        servers.value = servers.value.filter(serv => serv._id !== server._id)
    }

    function getUserServer (servId : string){
        return servers.value.filter(serv => serv._id === servId)
    }
    return { servers, getUserServer, deleteUserServer, addUserServers, addUserServer}
})