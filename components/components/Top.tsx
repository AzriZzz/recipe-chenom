import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const Top = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      className={`fixed bg-neutral-silver z-30 -translate-y-10 md:translate-y-0 bottom-1 right-1 md:bottom-5 md:right-5 cursor-pointer p-3 md:p-5 ${isVisible ? 'opacity-70' : 'opacity-0'
        } transition-opacity duration-300 text-white `}
      onClick={scrollToTop}
      aria-label="Back to Top"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  )
}

export default Top