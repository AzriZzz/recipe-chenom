import { SEARCHPLACEHOLDER } from '@/constants/data'
import React from 'react'

const Search = () => {
    return (
        <input
            type="text"
            placeholder={SEARCHPLACEHOLDER}
            className="md:w-2/4 lg:w-[500px] w-full mx-2 lg:mx-0 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-neutral-silver rounded-md shadow-sm"
        />)
}

export default Search