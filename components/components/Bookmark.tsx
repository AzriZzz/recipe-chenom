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
    <div className='cursor-pointer' onClick={handleClick}>
      {video.isBookmark ? (
        <FontAwesomeIcon
          icon={faStarSolid}
          className="text-2xl md:text-lg text-primary-yellow"

        />
      ) : (
        <FontAwesomeIcon
          icon={faStarRegular}
          className="text-2xl md:text-lg text-primary-dark-blue hover:text-primary-yellow"
        />
      )}
    </div>
  );
};

export default Bookmark;
