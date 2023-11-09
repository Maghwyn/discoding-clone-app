export interface Channel {
    _id: string;
    serverId: string;
    isDefault: boolean;
    name: string;
    type: ChannelType;
    createdAt: Date;
}

export type ChannelType = 'text' | 'audio';