import React, { useContext } from 'react';
import { formatSenderReceiver, renderSenderReceiverColor } from "../../../state/functions/bill-tracking.functions";
import { BillTrackingContext } from "../../../state/context/bill-tracking-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";

const PaneHeader = () => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const { selectedRowData } = useContext(BillTrackingContext);
  const { sender_id, sender_data, receiver_data, amount } = selectedRowData!;

  return (
    <div className="flex justify-between flex-wrap">
          <span
            style={{ fontSize: '1.2rem' }}
            className="font-bold">{formatSenderReceiver(userId!, sender_id, sender_data, receiver_data)}
          </span>
      <p
        style={{ fontSize: '1.5rem' }}
        className={`${renderSenderReceiverColor(userId!, sender_id)} font-bold`}>
        {`$${amount}`}
      </p>
    </div>
  )
};

export default PaneHeader;