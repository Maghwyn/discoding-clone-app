export type Channel = {
    _id: string;
    serverId: string;
    isDefault: boolean;
    name: string;
    type: ChannelType;
    createdAt: Date;
}

export type ChannelCreate = {
    name: string;
    type: ChannelType;
    serverId: string;
}

export type ChannelUpdate = {
    _id: string;
    name: string;
}

export type ChannelType = 'text' | 'audio';

