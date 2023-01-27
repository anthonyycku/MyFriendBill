import React, { useContext, useEffect, useState } from 'react';
import { DebtEntry } from "../../models/bill-tracking.model";
import {
  formatDate
} from "../../state/functions/bill-tracking.functions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import RowDataItem from "./components/row-data-item";
import NoteTextArea from "./components/note-text-area";
import PaneHeader from "./components/pane-header";
import { BillTrackingContext } from "../../state/context/bill-tracking-provider";

const BillingRightPane = () => {
  const { selectedRowData } = useContext(BillTrackingContext);

  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    setNote(selectedRowData!.note);
  }, [selectedRowData]);

  const handleCompleteButton = () => {

  };

  const {
    id,
    sender_id,
    amount,
    next_recurrence_date,
    completed,
    frequency_interval,
    created_at,
    receiver_data,
    sender_data,
    description
  } = selectedRowData!;

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <PaneHeader
          userId={userId!}
          sender_id={sender_id}
          sender_data={sender_data}
          receiver_data={receiver_data}
          amount={amount}
        />

        <div className="overflow-auto space-y-4">
          <RowDataItem heading="Description" data={description} inline={false}/>
          <RowDataItem heading="Creation Date" data={formatDate(created_at)}/>
          <RowDataItem heading="Due Date" data={formatDate(next_recurrence_date)} rawData={next_recurrence_date}/>
          <RowDataItem heading="Frequency" data={frequency_interval}/>

          <NoteTextArea note={note} setNote={setNote} debtId={id}/>
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