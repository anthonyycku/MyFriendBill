import React from 'react';
import { formatSenderReceiver, renderSenderReceiverColor } from "../../../state/functions/bill-tracking.functions";

interface PaneHeaderProps {
  userId: number;
  sender_id: number,
  sender_data: { name: string, id: number };
  receiver_data: { name: string, id: number };
  amount: number;
}

const PaneHeader = ({ userId, sender_id, sender_data, receiver_data, amount }: PaneHeaderProps) => {
  return (
    <div className="flex justify-between flex-wrap">
          <span
            style={{ fontSize: '1.2rem' }}
            className="font-bold">{formatSenderReceiver(userId, sender_id, sender_data, receiver_data)}
          </span>
      <p
        style={{ fontSize: '1.5rem' }}
        className={`${renderSenderReceiverColor(userId, sender_id)} font-bold`}>
        {`$${amount}`}
      </p>
    </div>
  )
};

export default PaneHeader;