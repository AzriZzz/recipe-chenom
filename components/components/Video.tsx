import React, { useState, useEffect } from 'react';
import { IVideo } from '@/models/interface';
import useSanitize from '@/hooks/useSanitize';
import Image from 'next/image';
import Bookmark from './Bookmark';
import YouTubePlayer from './YouTubePlayer';

const Video: React.FC<IVideo> = ({
  title,
  imgUrl,
  width,
  height,
  altTitle,
  videoUrl,
  video,
  views,
  onBookmarkChange,
}) => {
  const [displayPlayer, setDisplayPlayer] = useState(false);
  const [isTabletOrBigger, setIsTabletOrBigger] = useState(false);

  useEffect(() => {
    setIsTabletOrBigger(window.innerWidth >= 768);
    const handleResize = () => {
      setIsTabletOrBigger(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openVideo = (e: { preventDefault: () => void; }) => {
    if (isTabletOrBigger) {
      e.preventDefault();
      setDisplayPlayer(true);
    }
  };

  const closeVideo = () => {
    setDisplayPlayer(false);
  };

  return (
    <div className="w-full md:w-[250px] h-[270px] md:h-[200px] md:p-0 relative">
      <div className="w-full">
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" onClick={openVideo}>
          <div className="relative w-full h-[210px] md:h-[140px] md:rounded overflow-hidden transition-transform duration-300 lg:hover:scale-105">
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
          <div className="pl-2 text-sm font-bold md:pl-0 text-primary-dark-blue md:text-sm 2xl:text-sm">
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
              <p className="line-clamp-2" dangerouslySetInnerHTML={{ __html: useSanitize(title) }} />
            </a>
          </div>
          <div className="flex pr-2 ml-3 md:pr-0 ">
            <Bookmark video={video} onBookmarkChange={onBookmarkChange} />
          </div>
        </div>
      </div>
      {displayPlayer && <YouTubePlayer videoId={video.id} onClose={closeVideo} />}
    </div>
  );
};

export default Video;
