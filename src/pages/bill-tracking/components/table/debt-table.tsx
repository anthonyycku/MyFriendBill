import React from 'react';
import { DebtEntry } from "../../models/bill-tracking.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { formatSenderReceiver, renderSenderReceiverColor } from "../../functions/bill-tracking.functions";

interface DebtTableProps {
  displayedTableData: DebtEntry[];
  selectedRowId: number | null;
  setSelectedRowId: (id: number) => void;
}

const DebtTable = ({ displayedTableData, selectedRowId, setSelectedRowId }: DebtTableProps) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);

  const headerClass = "px-6 py-3"
  const cellClass = "px-6 py-4 max-w-[200px] truncate"

  const formatDate = (next_recurrence_date: Date): string => {
    const today = new Date();
    const dueDate = new Date(next_recurrence_date);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));
    return `${dueDate.toLocaleDateString()} (In ${daysDiff} days)`
  }

  return (
    <table className="w-full text-sm text-left text-white text-gray-400">
      <thead className="text-xs uppercase bg-gray-50 bg-gray-700 text-white">
      <tr>
        <th scope="col" className={headerClass}>
          To/From
        </th>
        <th scope="col" className={headerClass}>
          Amount
        </th>
        <th scope="col" className={headerClass}>
          Description
        </th>
        <th scope="col" className={headerClass}>
          Due Date
        </th>
        <th scope="col" className={headerClass}>
          Frequency
        </th>
        <th scope="col" className={`${headerClass} max-w-[100px]`}>
          Completed
        </th>
      </tr>
      </thead>

      <tbody>
      {displayedTableData.length > 0 && displayedTableData.map((debtItem: DebtEntry) => (
        <tr
          key={debtItem.id}
          onClick={() => setSelectedRowId(debtItem.id)}
          className={`border-b font-medium border-gray-700 hover:bg-gray-600 cursor-pointer ${selectedRowId === debtItem.id && 'bg-gray-600 border-solid border-2 border-emerald-500'} `}
        >
          <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
            {formatSenderReceiver(userId!, debtItem.sender_id, debtItem.sender_data, debtItem.receiver_data)}
          </th>
          <td
            className={`${cellClass} ${renderSenderReceiverColor(userId!, debtItem.sender_id, debtItem.sender_data, debtItem.receiver_data)}`}>
            {`$ ${debtItem.amount}`}
          </td>
          <td className={cellClass}>
            {debtItem.description}
          </td>
          <td className={cellClass}>
            {formatDate(debtItem.next_recurrence_date)}
          </td>
          <td className={cellClass}>

          </td>
          <td className={`pl-12 max-w-[150px]`}>
            <button className="hover:text-green-500" onClick={e => e.stopPropagation()}>
              <i className="fa fa-check-circle-o" style={{ fontSize: '1.5rem', margin: 0 }}></i>
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
};

export default DebtTable;