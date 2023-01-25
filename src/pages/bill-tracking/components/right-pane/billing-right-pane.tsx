import React from 'react';
import { DebtEntry } from "../../models/bill-tracking.model";
import { formatDate, formatSenderReceiver, renderSenderReceiverColor } from "../../functions/bill-tracking.functions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import RowDataItem from "./row-data-item";

const BillingRightPane = ({ selectedRowData }: { selectedRowData: DebtEntry }) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);

  const handleCompleteButton = () => {
    
  }

  const {
    sender_id,
    receiver_id,
    amount,
    next_recurrence_date,
    completed,
    frequency_interval,
    created_at,
    id,
    receiver_data,
    sender_data,
    description
  } = selectedRowData;

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex justify-between flex-wrap">
        <span style={{ fontSize: '1.2rem' }} className="font-bold">
          {formatSenderReceiver(userId!, sender_id, sender_data, receiver_data)}
        </span>
          <p
            style={{ fontSize: '1.5rem' }}
            className={`${renderSenderReceiverColor(userId!, sender_id)} font-bold`}>
            {`$${amount}`}
          </p>
        </div>

        <div className="overflow-auto space-y-4">
          <RowDataItem heading="Description" data={description} inline={false}/>
          <RowDataItem heading="Creation Date" data={formatDate(created_at)}/>
          <RowDataItem heading="Due Date" data={formatDate(next_recurrence_date)} rawData={next_recurrence_date}/>
          <RowDataItem heading="Frequency" data={frequency_interval}/>
        </div>
      </div>

      <div className="self-center w-full">
        <button
          className="w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          onClick={handleCompleteButton}
        >
          {completed ? `Restore this debt` : `Complete this debt`}
        </button>
      </div>
    </div>
  )
};

export default BillingRightPane;