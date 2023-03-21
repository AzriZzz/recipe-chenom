import { FilterProps } from '@/models/interface'
import React from 'react'

const Filter: React.FC<FilterProps> = ({ data, currentFilter, setCurrentFilter }) => {
  return (
    <div className=''>
      <ul className="flex flex-wrap items-center justify-center px-5 text-sm cursor-pointer lg:flex-row gap-x-5 md:text-lg lg:px-0">
        {data.map((item: string) => (
          <li
            key={item}
            className={`transition-all duration-300 py-1 ease-in-out text-xs md:text-sm hover:font-semibold max
            ${currentFilter === item ? 'font-semibold text-sm bg-primary-dark-blue text-neutral-white  px-2 rounded' : ''}`}
            onClick={() => setCurrentFilter(item)}
            >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Filter