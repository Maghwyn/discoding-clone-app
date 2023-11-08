export type Server = {
    _id: string;
    isOwner: boolean;
    iconUrl: string;
    bannerUrl: string;
    name: string;
    isPublic: boolean;
    createdAt: Date;
}

export type ServerCreate = {
    iconUrl: string;
    bannerUrl: string;
    name: string;
    isPublic: boolean;
}

export type ServerUpdate = {
    name: string;
    bannerUrl: string;
    iconUrl: string;
    isPublic: boolean;
    config: Config;
    members: Array<string>
    _id: string
}

type Config = {
    roles : Array<Role>
}

type Role = {
    name : string
}