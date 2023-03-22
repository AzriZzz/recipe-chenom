import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { BookmarkProps } from '@/models/interface';
import { InView } from 'react-intersection-observer';

const Bookmark: React.FC<BookmarkProps> = ({ video, onBookmarkChange }) => {
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(!active);
    onBookmarkChange(video);
  };

  const renderIcon = (isSolid: boolean) => (
    <FontAwesomeIcon
      icon={isSolid ? faStarSolid : faStarRegular}
      className={`text-2xl md:text-lg ${
        isSolid ? 'text-primary-yellow' : 'text-primary-dark-blue hover:text-primary-yellow'
      }`}
    />
  );

  return (
    <div className='' onClick={handleClick}>
      <InView>
        {({ inView, ref }) => (
          <div ref={ref}>
            {inView && (video.isBookmark ? renderIcon(true) : renderIcon(false))}
          </div>
        )}
      </InView>
    </div>
  );
};

export default Bookmark;
