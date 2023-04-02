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
      videoUrl: `https://www.youtube.com/watch?v=${video.id?.videoId}`,
      imgUrl: video.snippet?.thumbnails?.high?.url || '',
      width: video.snippet?.thumbnails?.high?.width || 0,
      height: video.snippet?.thumbnails?.high?.height || 0,
      altTitle: video.snippet?.title || '',
      isBookmark: false,
      views: parseInt(video.statistics?.viewCount ?? '0', 10),
    }));

    // Save the data to a new file
    await fs.writeFile(filePath, JSON.stringify(videos));

    const dataDir = path.join(process.cwd(), 'data');
    const files = await fs.readdir(dataDir);

    for (const file of files) {
      if (file.endsWith('.json') && file !== fileName) {
        const fileToDelete = path.join(dataDir, file);
        await fs.unlink(fileToDelete);
      }
    }
    return videos;
  }
}
