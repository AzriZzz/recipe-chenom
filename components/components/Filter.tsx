import { FilterProps } from '@/models/interface'
import React from 'react'

const Filter: React.FC<FilterProps> = ({ data, currentFilter, setCurrentFilter }) => {
  return (
    <div className=''>
      <ul className="flex flex-wrap items-center justify-center px-5 text-sm font-semibold cursor-pointer lg:flex-row gap-x-2 md:gap-x-5 lg:px-0 md:text-sm">
        {data.map((item: string) => (
          <li
            key={item}
            className={`px-2 py-1 ease-in-out ${currentFilter === item ? 'bg-primary-dark-blue text-neutral-white rounded' : ''
              }`}
          >
            <button
              aria-label={`Filter by ${item}`}
              onClick={() => setCurrentFilter(item)}
              role="button"
              className="w-full text-left"
            >
              {item}
            </button>
          </li>

        ))}
      </ul>
    </div>
  )
}

export default Filter