import fs from 'fs/promises';
import path from 'path';
import { VideoItemType } from '@/models/interface';
import { getChannelId, getVideos } from './youtubeHelper'; // Update the import path if necessary
import { google } from 'googleapis';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBEV3_KEY;

export async function fetchData(): Promise<VideoItemType[]> {
  const currentDate = new Date().toISOString().split('T')[0];
  const fileName = `${currentDate}.json`;
  const filePath = path.join(process.cwd(), 'data', fileName);

  // Check if the file for today exists
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    // If the file for today does not exist, fetch data from the API
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY,
    });

    const channelId = await getChannelId(youtube);

    if (!channelId) {
      throw new Error('Channel ID not found');
    }

    const searchResults = await getVideos(channelId);

    const videos: VideoItemType[] = searchResults.map(video => ({
      id: video.id?.videoId || '',
      title: video.snippet?.title || '',
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
      imgUrl: video.snippet?.thumbnails?.high?.url || '',
      width: video.snippet?.thumbnails?.high?.width || 0,
      height: video.snippet?.thumbnails?.high?.height || 0,
      altTitle: video.snippet?.title || '',
      isBookmark: false,
    }));

    // Save the data to a new file
    await fs.writeFile(filePath, JSON.stringify(videos));

    // Delete the file from yesterday, if it exists
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const yesterdayFileName = `${yesterday}.json`;
    const yesterdayFilePath = path.join(process.cwd(), 'data', yesterdayFileName);

    try {
      await fs.unlink(yesterdayFilePath);
    } catch (error) {
      // Do nothing if the file does not exist
    }

    return videos;
  }
}
