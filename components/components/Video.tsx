import React from 'react'
import { IVideo } from '@/models/interface';
import useSanitize from '@/hooks/useSanitize';
import Image from 'next/image';
import Bookmark from './Bookmark';

const Video: React.FC<IVideo> = ({ videoTitle, imgUrl, width, height, altTitle, videoUrl, isPriority, video, onBookmarkChange }) => {

  return (
    <div className="w-full md:w-[250px] h-[200px] md:p-2">
      <div className="w-full">
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative w-full h-[150px] overflow-hidden transition-transform duration-300 lg:hover:scale-105">
            <Image
              className="top-0 left-0 z-0 object-cover w-full h-full"
              src={imgUrl}
              alt={altTitle}
              width={width}
              height={height}
              priority={isPriority}
            />
          </div>
        </a>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm font-bold text-neutral-white-smoke md:text-xs 2xl:text-sm">
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              <p className="line-clamp-2" dangerouslySetInnerHTML={{ __html: useSanitize(videoTitle) }} />
            </a>
          </div>
          <div className="flex items-center">
            <Bookmark video={video} onBookmarkChange={onBookmarkChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
