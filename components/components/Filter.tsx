import { FilterProps } from '@/models/interface'
import React from 'react'

const Filter: React.FC<FilterProps> = ({ data, currentFilter, setCurrentFilter }) => {
  return (
    <div className=''>
      <ul className="flex flex-wrap justify-center px-5 text-sm cursor-pointer lg:flex-row gap-x-5 md:text-lg lg:px-0">
        {data.map((item: string) => (
          <li
            key={item}
            className={`transition-all duration-100 ease-in-out hover:font-semibold max
            ${currentFilter === item ? 'font-semibold' : ''}`}
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