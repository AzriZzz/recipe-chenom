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
    <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
      <div className="w-full h-[200px] relative">
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative w-full h-full rounded-lg overflow-hidden transition-transform duration-300 lg:hover:scale-105">
            <LazyImage
              className="rounded-lg w-full h-full object-cover absolute z-0 top-0 left-0"
              src={imgUrl}
              alt={altTitle}
            />
            <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-t from-neutral-black to-transparent rounded-lg flex items-end">
              <div className=' text-neutral-white-smoke text-sm font-bold h-[55px] w-full p-2'>
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