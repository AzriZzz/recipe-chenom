import React from 'react'

const Filter = ({ data }: any) => {
  return (
    <div className=''>
       <ul className="flex flex-row gap-x-5 cursor-pointer text-lg">
        {data.map((item: string) => (
          <li key={item} className="transition-all duration-100 ease-in-out hover:font-semibold">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Filter