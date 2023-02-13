import React, { FC, useContext, useState } from 'react';
import { DialogProps } from "../../../global/components/dialog/models/dialog-props";
import DialogContainer from "../../../global/components/dialog/dialog-container";
import { BillTrackingContext } from "../state/context/bill-tracking-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import SummaryItem from "./components/summary-item";

interface SummaryItemProps {
  name: string;
  amount: number;
}

const BillSummaryDialog: FC<DialogProps> = ({
                                              animationClass, modalRef, setOpenDialog = () => {
  }
                                            }) => {
  const { displayedTableData } = useContext(BillTrackingContext);
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const createSummary = () => {
    const result: SummaryItemProps[] = [];
    displayedTableData.forEach(entry => {
      if (entry.sender_id !== userId) {
        const nameIndex = result.findIndex(summaryItem => summaryItem.name === entry.sender_data.name);
        if (nameIndex >= 0) {
          result[nameIndex].amount += entry.amount;
        } else {
          result.push({ name: entry.sender_data.name, amount: entry.amount });
        }
      } else {
        const nameIndex = result.findIndex(summaryItem => summaryItem.name === entry.receiver_data.name);
        if (nameIndex >= 0) {
          result[nameIndex].amount -= entry.amount;
        } else {
          result.push({ name: entry.receiver_data.name, amount: -entry.amount });
        }
      }
    });
    return result;
  }
  const [summaryData] = useState(createSummary());

  return (
    <DialogContainer modalRef={modalRef} animationClass={animationClass} title="Bill Summary">
      <>
        <div className="min-h-[2rem] max-h-[500px] bg-gray-600 p-2 overflow-y-auto space-y-4">
          {displayedTableData.length === 0 ? (
            <p>You do not have any entries</p>
          ) : (
            <>
              {summaryData.map(item => (
                <SummaryItem key={item.name} name={item.name} amount={item.amount}/>
              ))}
            </>
          )}


        </div>
        <button
          className="mt-4 w-[66px] max-h-[40px] bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg"
          onClick={() => setOpenDialog(false)}>Close
        </button>
      </>
    </DialogContainer>
  )
};

export default BillSummaryDialog;