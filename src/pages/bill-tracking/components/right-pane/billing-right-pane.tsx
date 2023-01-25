import React from 'react';
import { DebtEntry } from "../../models/bill-tracking.model";
import { formatDate, formatSenderReceiver, renderSenderReceiverColor } from "../../functions/bill-tracking.functions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import RowDataItem from "./row-data-item";

const BillingRightPane = ({ selectedRowData }: { selectedRowData: DebtEntry }) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);

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
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between flex-wrap">
        <span style={{ fontSize: '1.2rem' }}
              className="font-bold">{formatSenderReceiver(userId!, sender_id, sender_data, receiver_data)}</span>
        <p style={{ fontSize: '1.5rem' }}
           className={`${renderSenderReceiverColor(userId!, sender_id)} font-bold`}>{`$${amount}`}</p>
      </div>
      <div className="overflow-auto space-y-4">
        <RowDataItem heading="Description" data={description} inline={false}/>
        <RowDataItem heading="Creation Date" data={formatDate(created_at)}/>
        <RowDataItem heading="Due Date" data={formatDate(next_recurrence_date)} rawData={next_recurrence_date}/>
        <RowDataItem heading="Frequency" data={frequency_interval}/>
        <RowDataItem heading="Completed" data={completed}/>

      </div>
    </div>
  )
};

export default BillingRightPane;