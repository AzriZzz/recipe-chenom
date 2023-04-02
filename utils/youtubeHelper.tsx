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
export async function getVideos(channelId: string | null | undefined = undefined): Promise<(youtube_v3.Schema$SearchResult & { statistics?: youtube_v3.Schema$VideoStatistics })[]> {
  if (!channelId) {
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY,
    });
    channelId = await getChannelId(youtube);
  }

  let allVideos: (youtube_v3.Schema$SearchResult & { statistics?: youtube_v3.Schema$VideoStatistics })[] = [];
  let nextPageToken: string | undefined = undefined;

  const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY,
  });

  do {
    const response: GaxiosResponse<youtube_v3.Schema$SearchListResponse> = await youtube.search.list({
      part: ['id'],
      channelId: channelId ?? undefined,
      maxResults: 100,
      type: ['video'],
      order: 'date',
      pageToken: nextPageToken,
    });

    const videoIds = (response.data.items ?? []).map(item => item.id?.videoId).filter(Boolean) as string[];

    const videoDetails = await youtube.videos.list({
      id: videoIds,
      part: ['snippet', 'statistics'],
    });

    const videosWithStatistics = (response.data.items ?? []).map(item => {
      const videoDetail = videoDetails.data.items?.find(video => video.id === item.id?.videoId);
      return {
        ...item,
        snippet: videoDetail?.snippet,
        statistics: videoDetail?.statistics,
      };
    });

    allVideos = [...allVideos, ...videosWithStatistics];
    nextPageToken = response.data.nextPageToken ?? undefined;
  } while (nextPageToken);

  return allVideos;
}
