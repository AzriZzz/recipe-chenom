import { ReactNode } from "react";

export interface SearchResult {
    kind: string;
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
    };
}
export interface VideoItemType {
    id?: string;
    title: string;
    videoUrl: string;
    imgUrl: string;
    width: number;
    height: number;
    altTitle: string;
    isBookmark: boolean;
}

export interface IVideo extends VideoItemType{
    video: VideoItemType;
    onBookmarkChange: (video: VideoItemType) => void;
}
export interface BookmarkProps {
    video: VideoItemType;
    onBookmarkChange: (video: VideoItemType) => void;
}

export interface LayoutProps {
    meta: Meta;
    children: ReactNode;
}

interface Meta {
    title: string;
    description: string;
    type: string;
    image: string;
    pathUrl: string
}

export interface SearchProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    hasResults: boolean;
}

export interface FilterProps {
    data: string[];
    currentFilter: string;
    setCurrentFilter: (filter: string) => void;
}