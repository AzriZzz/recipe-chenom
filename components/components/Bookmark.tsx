import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { BookmarkProps } from '@/models/interface';

const Bookmark: React.FC<BookmarkProps> = ({ video, onBookmarkChange }) => {
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(!active);
    onBookmarkChange(video);
  };

  return (
    <div
      className="absolute z-20 cursor-pointer right-1 top-1 bg-primary-dark-"
      onClick={handleClick}
    >
      {video.isBookmark ? (
        <FontAwesomeIcon
          icon={faStarSolid}
          className="text-lg text-primary-yellow"
          
        />
      ) : (
        <FontAwesomeIcon
          icon={faStarRegular}
          className="text-lg text-primary-yellow hover:text-primary-yellow"
        />
      )}
    </div>
  );
};

export default Bookmark;
