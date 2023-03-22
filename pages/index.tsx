import Image from 'next/image';
import Video from '@/components/components/Video';
import Filter from '@/components/components/Filter';
import Search from '@/components/components/Search';
import Layout from '@/components/Layout/Layout';
import { title, visitTitle, youtubeLink } from '@/constants/data';
import { ToastContainer } from 'react-toastify';
import { filterList, meta } from '@/constants/config';
import { VideoItemType } from '@/models/interface';
import { cheNomJson } from '@/constants/mock';
import { useMemo, useState } from 'react';
import { motion } from "framer-motion";
import showToast from '@/constants/toastConfig';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('All');
  const [bookmarkedIndex, setBookmarkedIndex] = useState<number | null>(null);
  const [resultData, setResultData] = useState(
    cheNomJson.map((item) => ({
      ...item,
      isBookmark: false,
    }))
  );

  const handleBookmarkChange = (video: VideoItemType) => {
    const updatedResultData = resultData.map((v) =>
      v.id.videoId === video.id.videoId
        ? { ...v, isBookmark: !v.isBookmark }
        : v
    );
    setResultData(updatedResultData);

    const bookmarkedVideo = updatedResultData.find(
      (v) => v.id.videoId === video.id.videoId && v.isBookmark
    );
    setBookmarkedIndex(bookmarkedVideo ? updatedResultData.indexOf(bookmarkedVideo) : null);

    if (bookmarkedVideo) {
      showToast(`"${video.snippet.title}" added to bookmarks!`, 'success');
    } else {
      showToast(`"${video.snippet.title}" removed from bookmarks!`, 'error');
    }
  };

  const filteredResults = useMemo(() => resultData
    .filter((video) => {
      const titleLower = video.snippet.title.toLowerCase();
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
        <h1 className='flex items-center justify-center py-5 text-2xl font-bold md:text-3xl w-1/'>
          <a target="_blank" href={youtubeLink} rel="noopener noreferrer" title={visitTitle}>
            {title}
          </a>
        </h1>
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
            <div className="w-full sm:px-2 sm:w-auto sm:grid sm:grid-cols-2 sm:gap-4 md:gap-4 md:grid-cols-3">
              {filteredResults.map((video, index) => (
                <motion.div
                  key={video.id.videoId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  style={{ zIndex: bookmarkedIndex === index ? 1 : 'auto' }}
                >
                  <Video
                    video={video}
                    onBookmarkChange={handleBookmarkChange}
                    videoTitle={video.snippet.title}
                    channelTitle={video.snippet.channelTitle}
                    imgUrl={video.snippet.thumbnails.medium.url}
                    width={video.snippet.thumbnails.medium.width}
                    height={video.snippet.thumbnails.medium.height}
                    altTitle={video.snippet.title}
                    videoUrl={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    isPriority={index < 5}
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
                  className="relative"
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