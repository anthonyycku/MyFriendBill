import React, { useContext } from 'react';
import { BillTrackingContext } from "../../../state/context/bill-tracking-provider";

const DebtSearchBar = () => {
  const { setSearchQuery, deferredSearch } = useContext(BillTrackingContext);

  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
  }

  return (
    <>
      <label className="mb-2 text-sm font-medium sr-only text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          type="search"
          value={deferredSearch}
          className="block min-w-[200px] w-1/5 p-2 pl-10 border text-sm rounded-lg bg-gray-50 bg-gray-700 border-gray-600 text-white outline-0"
          placeholder="Search"
          onChange={e => handleQueryChange(e.target.value)}
        />
      </div>
    </>
  )
};

export default DebtSearchBar;