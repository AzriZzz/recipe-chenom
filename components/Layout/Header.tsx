import { title, visitTitle, youtubeLink } from '@/constants/data'
import React from 'react'

const Header = () => {
  return (
    <header>
      <h1 className='flex items-center justify-center py-5 text-2xl font-bold md:text-3xl w-1/'>
        <a target="_blank" href={youtubeLink} rel="noopener noreferrer" title={visitTitle}>
          {title}
        </a>
      </h1>
    </header>
  )
}

export default Header