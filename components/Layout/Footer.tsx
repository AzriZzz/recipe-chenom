import { disclaimer, githubDescription, githubLink } from '@/constants/data'
import React from 'react'

const Footer = () => {
  return (
    <footer className='grid py-5 text-sm place-content-center bg-primary-backgroud-blue' >
      <a className='transition-all duration-100 ease-in-out hover:underline' target="_blank" href={githubLink} rel="noopener noreferrer" title={githubDescription}>
        {disclaimer}
      </a>
    </footer>
  )
}

export default Footer