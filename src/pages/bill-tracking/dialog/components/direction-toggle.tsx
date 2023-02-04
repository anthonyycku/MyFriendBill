import React from 'react';
import { DebtDirection } from "../../constants/bill-tracking.constants";

const DirectionToggle = ({
                           debtDirection,
                           setDebtDirection
                         }: { debtDirection: string, setDebtDirection: (dir: string) => void }) => {

  const style = (option: string): string => {
    return option === debtDirection ? 'focus:bg-gray-800 bg-gray-800 border border-1 border-emerald-400 shadow-[inset_0_0_3px_3px_#323232]' : 'bg-gray-700'
  }

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={() => setDebtDirection(DebtDirection.TO)}
        className={`${style(DebtDirection.TO)} w-16 border-r-2 border-gray-500 px-4 py-2 text-sm font-medium rounded-l-lg text-white hover:bg-gray-600 `}
      >
        {DebtDirection.TO}
      </button>
      <button
        type="button"
        onClick={() => setDebtDirection(DebtDirection.FROM)}
        className={`${style(DebtDirection.FROM)} w-16 px-4 py-2 text-sm font-medium rounded-r-lg text-white hover:bg-gray-600`}
      >
        {DebtDirection.FROM}
      </button>
    </div>
  )
};

export default DirectionToggle;