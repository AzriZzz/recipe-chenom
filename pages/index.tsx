import Video from '@/components/components/Video';
import Filter from '@/components/components/Filter';
import Search from '@/components/components/Search';
import Layout from '@/components/Layout/Layout';
import { filterList, meta } from '@/constants/config';
import { title, visitTitle, youtubeLink } from '@/constants/data';
import { cheNomJson } from '@/constants/mock';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const resultData = cheNomJson;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('All');

  const filteredResults = resultData.filter((video) => {
    return (
      video.snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (currentFilter === 'All' ||
        video.snippet.title.toLowerCase().includes(currentFilter.toLowerCase()))
    );
  });
  const hasResults = filteredResults.length > 0;

  return (
    <Layout meta={meta}>
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
                  videoTitle={video.snippet.title}
                  channelTitle={video.snippet.channelTitle}
                  imgUrl={video.snippet.thumbnails.medium.url}
                  width={video.snippet.thumbnails.medium.width}
                  height={video.snippet.thumbnails.medium.height}
                  altTitle={video.snippet.title}
                  videoUrl={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  isPriority={index < 10}
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