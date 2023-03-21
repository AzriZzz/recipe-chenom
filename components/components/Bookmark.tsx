import React from 'react'

const Bookmark = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Bookmark')
  };
  
  return (
     <div
          className='absolute z-20 right-1 top-1 bg-primary-dark-blue text-neutral-white-smoke hover:text-primary-success hover:cursor-pointer'
          onClick={handleClick}
        >
          Star
        </div> 
  )
}

export default Bookmark