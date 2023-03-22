import { NextApiRequest, NextApiResponse } from 'next';
import { fetchData } from '@/utils/fetchData';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}

export default handler;
