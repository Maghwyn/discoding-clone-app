export interface Serv {
    _id: string;
    isOwner: boolean;
    iconUrl: string;
    bannerUrl: string;
    name: string;
    isPublic: boolean;
    createdAt: Date;
    updated: boolean;
    lastChannelId: string;
    notificationCount: number;
}