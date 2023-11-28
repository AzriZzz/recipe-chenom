import React from 'react'
import Image from 'next/image';
import { title, visitTitle, youtubeLink } from '@/constants/data'

const Header = () => {
  return (
    <header className='flex justify-center'>
      <h1 className='relative flex py-5 text-2xl font-bold md:text-3xl'>
        <a target="_blank" href={youtubeLink} rel="noopener noreferrer" title={visitTitle}>
          {title}
        </a>
        <div className='ml-3'>
          <Image
            src="/images/mortar.png"
            alt="Mortar icons created by Freepik - Flaticon"
            width={30}
            height={30}
            priority
          />
        </div>
      </h1>
    </header>
  )
}

export default Header