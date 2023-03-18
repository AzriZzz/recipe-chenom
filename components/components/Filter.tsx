import React from 'react'

const Filter = ({ data }: any) => {
  return (
    <div className=''>
       <ul className="flex flex-wrap justify-center lg:flex-row gap-x-5 cursor-pointer md:text-lg text-sm px-5 lg:px-0">
        {data.map((item: string) => (
          <li key={item} className="transition-all duration-100 ease-in-out hover:font-semibold max">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Filter