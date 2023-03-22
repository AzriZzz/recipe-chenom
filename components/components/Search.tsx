// search.tsx
import { SEARCHPLACEHOLDER } from '@/constants/data';
import { SearchProps } from '@/models/interface';
import React from 'react';

const Search = ({ searchTerm, setSearchTerm, hasResults }: SearchProps) => {
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="relative md:w-2/4 lg:w-[500px] w-full mx-2 lg:mx-0">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                placeholder={SEARCHPLACEHOLDER}
                className={`w-full py-3 pl-4 pr-10 leading-tight focus:outline-none focus:shadow-outline border border-neutral-silver rounded-md shadow-sm ${hasResults ? '' : ' text-primary-danger'}`}
                />
            {searchTerm && (
                <button
                    className="absolute right-0 flex items-center justify-center w-5 h-5 text-gray-700 transform -translate-x-4 -translate-y-1/2 border rounded-full top-1/2 focus:outline-none"
                    onClick={() => setSearchTerm('')}
                    aria-label={SEARCHPLACEHOLDER}
                >
                    ×
                </button>

            )}
        </div>
    );
};

export default Search;
