import { NextApiRequest, NextApiResponse } from 'next';
import { google, youtube_v3 } from 'googleapis';

const API_KEY = '';
const CHANNEL_NAME = 'CheNom';

async function getChannelId(youtube: youtube_v3.Youtube): Promise<string | null> {
  const response = await youtube.search.list({
    part: ['snippet'],
    q: CHANNEL_NAME,
    type: ['channel'],
    maxResults: 1,
  });

  return response.data.items?.[0]?.id?.channelId || null;
}

async function getVideos(channelId: string): Promise<youtube_v3.Schema$SearchResult[]> {
  const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY,
  });

  const response = await youtube.search.list({
    part: ['snippet'],
    channelId: channelId,
    maxResults: 50, // You can change this to the number of videos you want to retrieve (max 50 per request)
    type: ['video'],
    order: 'date',
  });

  return response.data.items || [];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY,
    });
    
    const channelId = await getChannelId(youtube);

    if (!channelId) {
      res.status(404).json({ error: `Channel "${CHANNEL_NAME}" not found.` });
      return;
    }

    const videos = await getVideos(channelId);
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching videos from the YouTube API.' });
  }
}
