import Image from 'next/image';
import Video from '@/components/components/Video';
import Filter from '@/components/components/Filter';
import Search from '@/components/components/Search';
import Layout from '@/components/Layout/Layout';
import { title, visitTitle, youtubeLink } from '@/constants/data';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import { filterList, meta } from '@/constants/config';
import { VideoItemType } from '@/models/interface';
import { cheNomJson } from '@/constants/mock';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('All');

  const [resultData, setResultData] = useState(
    cheNomJson.map((item) => ({
      ...item,
      isBookmark: false,
    }))
  );

  const toastStyle = {
    hideProgressBar: true,
    autoClose: 2000,
    position: 'bottom-right' as ToastPosition,
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    toast(message, {
      ...toastStyle,
      type,
    });
  };

  const handleBookmarkChange = (video: VideoItemType) => {
    const updatedResultData = resultData.map((v) =>
      v.id.videoId === video.id.videoId
        ? { ...v, isBookmark: !v.isBookmark }
        : v
    );
    setResultData(updatedResultData);

    const isBookmarked = (
      updatedResultData.find((v) => v.id.videoId === video.id.videoId) ?? { isBookmark: false }
    ).isBookmark;

    if (isBookmarked) {
      showToast(`"${video.snippet.title}" added to bookmarks!`, 'success');
    } else {
      showToast(`"${video.snippet.title}" removed from bookmarks!`, 'error');
    }
  };

  const filteredResults = resultData
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
    .sort((a, b) => (b.isBookmark ? 1 : 0) - (a.isBookmark ? 1 : 0));

  const hasResults = filteredResults.length > 0;

  return (
    <Layout meta={meta}>
      <ToastContainer />
      <div className='bg-primary-backgroud-blue text-primary-dark-blue'>
        <h1 className='flex items-center justify-center py-5 text-3xl font-bold w-1/'>
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
                <Video
                  key={video.id.videoId}
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
              ))}
            </div>
          ) : (
            <div className="grid place-content-center">
              <Image
                src="/images/no-food.jpg"
                alt="No food here"
                className="relative"
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>

  )
}