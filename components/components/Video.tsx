/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { IVideo } from '@/models/interface';
import useSanitize from '@/hooks/useSanitize';
import Image from 'next/image';
import Bookmark from './Bookmark';

const Video = ({ videoTitle, imgUrl, width, height, altTitle, videoUrl, isPriority }: IVideo) => {

  

  return (
    <div className="md:w-[250px] h-[200px] p-2">
      <div className="w-full h-[200px] relative">
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative w-full h-full overflow-hidden transition-transform duration-300 lg:hover:scale-105">
            <Image
              className="top-0 left-0 z-0 object-cover w-full h-full"
              src={imgUrl}
              alt={altTitle}
              width={width}
              height={height}
              priority={isPriority}
            />
            <div className="absolute top-0 left-0 z-10 flex items-end w-full h-full bg-gradient-to-t from-neutral-black to-transparent">
              <div className=' text-neutral-white-smoke text-sm md:text-xs 2xl:text-sm font-bold h-[55px] w-full p-2'>
                <p dangerouslySetInnerHTML={{ __html: useSanitize(videoTitle) }} />
              </div>
            </div>
          </div>
        </a>
        <Bookmark />
      </div>
    </div>
  )
}

export default Video