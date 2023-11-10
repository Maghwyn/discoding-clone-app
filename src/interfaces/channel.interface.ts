export interface Channel {
    _id: string;
    serverId: string;
    isDefault: boolean;
    name: string;
    type: ChannelType;
    createdAt: Date;
    notificationCount: number
}

export type ChannelType = 'text' | 'audio';