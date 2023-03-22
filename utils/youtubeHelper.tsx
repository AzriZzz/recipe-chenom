import { google, youtube_v3 } from 'googleapis';
import { channelName } from '@/constants/data';
import { GaxiosResponse } from 'googleapis-common';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBEV3_KEY;
const CHANNEL_NAME = channelName;

export async function getChannelId(youtube: youtube_v3.Youtube): Promise<string | null> {
  const response = await youtube.search.list({
    part: ['snippet'],
    q: CHANNEL_NAME,
    type: ['channel'],
    maxResults: 1,
  });

  return response.data.items?.[0]?.id?.channelId || null;
}

export async function getVideos(channelId: string | null | undefined = undefined): Promise<youtube_v3.Schema$SearchResult[]> {
  if (!channelId) {
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY,
    });
    channelId = await getChannelId(youtube);
  }

  let allVideos: youtube_v3.Schema$SearchResult[] = [];
  let nextPageToken: string | undefined = undefined;

  const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY,
  });

  do {
    const response: GaxiosResponse<youtube_v3.Schema$SearchListResponse> = await youtube.search.list({
      part: ['snippet'],
      channelId: channelId ?? undefined,
      maxResults: 100,
      type: ['video'],
      order: 'date',
      pageToken: nextPageToken,
    });

    allVideos = [...allVideos, ...(response.data.items ?? [])];
    nextPageToken = response.data.nextPageToken ?? undefined;
  } while (nextPageToken);

  return allVideos;
}



