import { defineStore } from 'pinia';

import { type Channel } from '../interfaces/channel.interface'
import { ref } from "vue";

export const channelsStore = defineStore('Channels',() => {
    const channels : Array<Channel> = ref([])

    function addChannel(channel : Channel){
        channels.value.push(channel)
    }

    function addChannels (channels: Array<Channel>){
        channels.value = servs
    }

    function deleteChannels (channel : Channel) {
        channels.value = channels.value.filter(serv => serv._id !== channel._id)
    }

    function getChannels (servId : string){
        return channels.value.filter(chan => chan.serverId === servId)
    }
    return { channels, getChannels, deleteChannels, addChannel, addChannels}
})