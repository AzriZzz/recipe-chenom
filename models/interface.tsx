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

export interface IVideo {
    videoTitle: string,
    channelTitle: string,
    imgUrl: string,
    width: number,
    height: number,
    altTitle: string,
    videoUrl: string,
    isPriority: boolean,
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
}

export interface SearchProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    hasResults: boolean;
}

export interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
  }