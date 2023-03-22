import React from 'react'
import { IVideo } from '@/models/interface';
import useSanitize from '@/hooks/useSanitize';
import Image from 'next/image';
import Bookmark from './Bookmark';

const Video: React.FC<IVideo> = ({ 
  title, 
  imgUrl, 
  width, 
  height, 
  altTitle, 
  videoUrl, 
  video,
  onBookmarkChange 
}) => {

  return (
    <div className="w-full md:w-[250px] h-[270px] md:h-[190px] md:p-0">
      <div className="w-full">
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative w-full h-[210px] md:h-[140px]  md:rounded overflow-hidden transition-transform duration-300 lg:hover:scale-105">
            <Image
              className="top-0 left-0 z-0 object-cover w-full h-full"
              src={imgUrl}
              alt={altTitle}
              width={width}
              height={height}
            />
          </div>
        </a>
        <div className="relative flex flex-row justify-between mt-2 align-top items-top">
          <div className="pl-2 text-sm font-bold md:pl-0 text-primary-dark-blue md:text-xs 2xl:text-sm">
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              <p className="line-clamp-2" dangerouslySetInnerHTML={{ __html: useSanitize(title) }} />
            </a>
          </div>
          <div className="flex pr-2 ml-3 md:pr-0 ">
            <Bookmark video={video} onBookmarkChange={onBookmarkChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
