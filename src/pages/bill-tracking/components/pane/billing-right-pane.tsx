import React from 'react';
import { DebtEntry } from "../../models/bill-tracking.model";
import { formatSenderReceiver } from "../../functions/bill-tracking.functions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

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
    <div className="flex flex-col">
      <span className="font-extrabold">
        {formatSenderReceiver(userId!, sender_id, sender_data, receiver_data)}
      </span>
    </div>
  )
};

export default BillingRightPane;