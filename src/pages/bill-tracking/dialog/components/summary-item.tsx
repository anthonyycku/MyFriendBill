import React, { FC } from 'react';
import { formatAmount } from "../../state/functions/bill-tracking.functions";

interface SummaryItemProps {
  name: string;
  amount: number;
}

const SummaryItem: FC<SummaryItemProps> = ({ name, amount }) => {
  return (
    <div>
      {amount > 0 ? (
        <span className="flex">
          <p>
            <span className="font-medium">{name}</span> owes you a total of <span
            className="text-green-500 font-medium">${formatAmount(amount)}</span>
          </p>
        </span>
      ) : (
        <p>
          You owe <span className="font-medium">{name}</span> a total of <span
          className="text-amber-500 font-medium">${formatAmount(Math.abs(amount))}</span>
        </p>
      )}
    </div>
  )
};

export default SummaryItem;