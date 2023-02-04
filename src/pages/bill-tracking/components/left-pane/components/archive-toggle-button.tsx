import React, { useContext } from 'react';
import { BillTrackingContext } from "../../../state/context/bill-tracking-context";

const ArchiveToggleButton = () => {
  const { isArchive, setIsArchive } = useContext(BillTrackingContext);

  const style = (active: boolean): string => {
    return active !== isArchive ? 'focus:bg-gray-800 bg-gray-800 border border-1 border-emerald-400 shadow-[inset_0_0_3px_3px_#323232]' : 'bg-gray-700';
  }

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={() => setIsArchive(false)}
        className={`${style(true)} w-20 border-r-2 border-gray-500 px-4 py-2 text-sm font-medium rounded-l-lg text-white hover:bg-gray-600 `}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => setIsArchive(true)}
        className={`${style(false)} w-20 px-4 py-2 text-sm font-medium rounded-r-lg text-white hover:bg-gray-600`}
      >
        Archive
      </button>
    </div>
  )
};

export default ArchiveToggleButton;