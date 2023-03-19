/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { IVideo } from '@/models/interface';
import useSanitize from '@/hooks/useSanitize';
import LazyImage from './LazyImage';

const Video = ({ videoTitle, imgUrl, altTitle, videoUrl }: IVideo) => {

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Bookmark')
  };

  return (
    <div className='w-full p-2 md:w-1/2 lg:w-1/3'>
      <div className="w-full h-[200px] relative">
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative w-full h-full overflow-hidden transition-transform duration-300 rounded-lg lg:hover:scale-105">
            <LazyImage
              className="absolute top-0 left-0 z-0 object-cover w-full h-full rounded-lg"
              src={imgUrl}
              alt={altTitle}
            />
            <div className="absolute top-0 left-0 z-10 flex items-end w-full h-full rounded-lg bg-gradient-to-t from-neutral-black to-transparent">
              <div className=' text-neutral-white-smoke text-sm md:text-xs 2xl:text-sm font-bold h-[55px] w-full p-2'>
                <p dangerouslySetInnerHTML={{ __html: useSanitize(videoTitle) }} />
              </div>
            </div>
          </div>
        </a>
        <div
          className='absolute z-20 right-1 top-1 bg-primary-dark-blue text-neutral-white-smoke hover:text-primary-success hover:cursor-pointer'
          onClick={handleClick}
        >
          Star
        </div>
      </div>
    </div>
  )
}

export default Video