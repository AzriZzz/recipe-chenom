import showToast from '@/constants/toastConfig';
import Filter from '@/components/components/Filter';
import Search from '@/components/components/Search';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image';
import Video from '@/components/components/Video';
import { useEffect, useMemo, useState } from 'react';
import { filterList, meta } from '@/constants/config';
import { GetStaticProps } from 'next';
import { ToastContainer } from 'react-toastify';
import { VideoItemType } from '@/models/interface';
import { fetchData } from '@/utils/fetchData'; // Update the import path if necessary
import { motion } from "framer-motion";

interface HomeProps {
  cheNomJson: VideoItemType[];
}

export default function Home({ cheNomJson }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('All');
  const [bookmarkedIndex, setBookmarkedIndex] = useState<number | null>(null);
  const [resultData, setResultData] = useState(cheNomJson);

  useEffect(() => {
    // Load bookmark data from localStorage when the component mounts
    const bookmarkedVideos = JSON.parse(localStorage.getItem('bookmarkedVideos') || '[]');
    setResultData(
      cheNomJson.map((item) => ({
        ...item,
        isBookmark: bookmarkedVideos.includes(item.id),
      }))
    );
  }, []);

  useEffect(() => {
    // Save bookmark data to localStorage after each change
    localStorage.setItem(
      'bookmarkedVideos',
      JSON.stringify(resultData.filter((v) => v.isBookmark).map((v) => v.id))
    );
  }, [resultData]);

  const handleBookmarkChange = (video: VideoItemType) => {
    const updatedResultData = resultData.map((v) =>
      v.id === video.id
        ? { ...v, isBookmark: !v.isBookmark }
        : v
    );
    setResultData(updatedResultData);

    const bookmarkedVideo = updatedResultData.find(
      (v) => v.id === video.id && v.isBookmark
    );
    setBookmarkedIndex(bookmarkedVideo ? updatedResultData.indexOf(bookmarkedVideo) : null);

    if (bookmarkedVideo) {
      // Add the video ID to localStorage
      localStorage.setItem(
        'bookmarkedVideos',
        JSON.stringify([...JSON.parse(localStorage.getItem('bookmarkedVideos') || '[]'), video.id])
      );
      showToast(`"${video.title}" added to bookmarks!`, 'success');
    } else {
      // Remove the video ID from localStorage
      localStorage.setItem(
        'bookmarkedVideos',
        JSON.stringify(JSON.parse(localStorage.getItem('bookmarkedVideos') || '[]').filter((id: string) => id !== video.id))
      );
      
      showToast(`"${video.title}" removed from bookmarks!`, 'error');
    }
  };

  const filteredResults = useMemo(() => resultData
    .filter((video) => {
      const titleLower = video.title.toLowerCase();
      const isIncluded = titleLower.includes(searchTerm.toLowerCase());
      const isBookmarkFilter = currentFilter === 'Bookmark';

      if (isBookmarkFilter) {
        return isIncluded && video.isBookmark;
      }

      if (currentFilter !== 'All') {
        return isIncluded && titleLower.includes(currentFilter.toLowerCase());
      }

      return isIncluded;
    })
    .sort((a, b) => (b.isBookmark ? 1 : 0) - (a.isBookmark ? 1 : 0)), [resultData, searchTerm, currentFilter]);

  const hasResults = filteredResults.length > 0;

  return (
    <Layout meta={meta}>
      <ToastContainer />
      <div className='bg-primary-backgroud-blue text-primary-dark-blue'>
        <div className='flex items-center justify-center w-full px-5'>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hasResults={hasResults}
          />
        </div>
        <div className='flex items-center justify-center py-5'>
          <Filter
            data={filterList}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        </div>
        <div className='flex justify-center '>
          {hasResults ? (
            <div className="w-full sm:px-2 sm:w-auto sm:grid sm:grid-cols-2 sm:gap-4 md:gap-2 2xl:grid-cols-4 md:grid-cols-3">
              {filteredResults.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  style={{ zIndex: bookmarkedIndex === index ? 1 : 'auto' }}
                >
                  <Video
                    title={video.title}
                    imgUrl={video.imgUrl}
                    width={video.width}
                    height={video.height}
                    altTitle={video.title}
                    videoUrl={video.videoUrl}
                    isBookmark={video.isBookmark}
                    video={video}
                    onBookmarkChange={handleBookmarkChange}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid place-content-center">
                <Image
                  src="/images/no-food.jpg"
                  alt="No food here"
                  className="relative rounded"
                  width={300}
                  height={300}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const cheNomJson = await fetchData();

  return {
    props: {
      cheNomJson,
    },
    revalidate: 60, 
  };
};