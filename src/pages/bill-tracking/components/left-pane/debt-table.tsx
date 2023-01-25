import React from 'react';
import { DebtEntry } from "../../models/bill-tracking.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import {
  formatDate,
  formatSenderReceiver,
  pastDueDate,
  renderSenderReceiverColor
} from "../../functions/bill-tracking.functions";
import '../../css/debt-table.css';

interface DebtTableProps {
  displayedTableData: DebtEntry[];
  selectedRowId: number | null;
  setSelectedRowId: (id: number) => void;
}

const DebtTable = ({ displayedTableData, selectedRowId, setSelectedRowId }: DebtTableProps) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);

  const headerClass = "px-6 py-3"
  const cellClassShort = "px-6 py-4 max-w-[100px] truncate"
  const cellClassLong = "px-6 py-4 max-w-[200px] truncate"


  return (
    <div className="overflow-auto h-full">
      <table className="w-full text-left text-sm text-white text-gray-400 border-separate border-spacing-0">
        <thead className="text-xs uppercase bg-gray-50 bg-gray-700 text-white sticky top-0">
        <tr>
          <th scope="col" className={headerClass}>To/From</th>
          <th scope="col" className={headerClass}>Amount</th>
          <th scope="col" className={headerClass}>Description</th>
          <th scope="col" className={headerClass}>Due Date</th>
          <th scope="col" className={headerClass}>Frequency</th>
          <th scope="col" className={`${headerClass} max-w-[100px]`}>Completed</th>
        </tr>
        </thead>

        <tbody>
        {displayedTableData.length > 0 && displayedTableData.map((debtItem: DebtEntry) => (
          <tr
            key={debtItem.id}
            onClick={() => setSelectedRowId(debtItem.id)}
            className={`debt-table-row font-medium border-gray-700 hover:bg-gray-500 cursor-pointer ${selectedRowId === debtItem.id && 'bg-gray-600 debt-table-row-selected'} `}
          >
            <th scope="row" className="px-6 py-4 font-medium text-white truncate max-w-[250px]">
              {formatSenderReceiver(userId!, debtItem.sender_id, debtItem.sender_data, debtItem.receiver_data)}
            </th>
            <td
              className={`${cellClassShort} ${renderSenderReceiverColor(userId!, debtItem.sender_id)}`}>
              {`$ ${debtItem.amount}`}
            </td>
            <td className={cellClassLong}>
              {debtItem.description}
            </td>
            <td className={cellClassLong}>
              <span className={`flex space-x-2 items-center ${pastDueDate(debtItem.next_recurrence_date)}`}>
                <p>{formatDate(debtItem.next_recurrence_date)}</p>
                {pastDueDate(debtItem.next_recurrence_date) && <i className="fa fa-exclamation-triangle"/>}
              </span>
            </td>
            <td className={cellClassLong}>

            </td>
            <td className={`pl-12 max-w-[100px]`}>
              <button className="hover:text-green-500" onClick={e => e.stopPropagation()}>
                <i className="fa fa-check-circle-o" style={{ fontSize: '1.5rem', margin: 0 }}></i>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
};

export default DebtTable;