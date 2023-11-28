import React, { useCallback, useEffect, useRef } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import YouTube, { YouTubePlayer,YouTubeProps } from 'react-youtube';

const YouTubePlayer: React.FC<YouTubePlayer> = ({ videoId, onClose }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.playVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);


  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-opacity-75 bg-primary-dark-blue">
      <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
        <div className="absolute top-0 right-0">
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} className="p-2 w-[23px] translate-x-3 -translate-y-10 h-[30px] text-2xl rounded-full bg-neutral-white-smoke text-primary-dark-blue hover:text-neutral-dim-grey" />
          </button>
        </div>
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      </div>
    </div>
  );
};

export default YouTubePlayer