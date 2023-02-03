import React, { useContext } from 'react';
import {
  formatDate
} from "../../state/functions/bill-tracking.functions";
import RowDataItem from "./components/row-data-item";
import NoteTextArea from "./components/note-text-area";
import PaneHeader from "./components/pane-header";
import { BillTrackingContext } from "../../state/context/bill-tracking-context";
import { DateTime } from "luxon";
import { completeDebt } from "../../api/bill-tracking.api";
import { errorHandler } from "../../../../global/functions/error-handler/error-handler";

const BillingRightPane = () => {
  const { selectedRowData } = useContext(BillTrackingContext);

  const {
    next_recurrence_date,
    frequency_interval,
    created_at,
    description
  } = selectedRowData!;

  const handleComplete = () => {
    const updatedRowData = { ...selectedRowData };
    delete updatedRowData.receiver_data;
    delete updatedRowData.sender_data;
    completeDebt(updatedRowData!).then(response => {
      console.log(response)
    }).catch(error => errorHandler(error));
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <PaneHeader/>

        <div className="overflow-auto space-y-4">
          <RowDataItem heading="Description" data={description} inline={false}/>
          <RowDataItem heading="Creation Date" data={DateTime.fromISO(created_at).toFormat("MM/dd/yyyy, HH:mm")}/>
          <RowDataItem heading="Due Date" data={formatDate(next_recurrence_date)} rawData={next_recurrence_date}/>
          <RowDataItem heading="Frequency" data={frequency_interval}/>

          <NoteTextArea/>
        </div>
      </div>

      <div className="self-center w-full">
        <button
          className="w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          onClick={handleComplete}
        >
          Mark as complete
        </button>
      </div>
    </div>
  )
};

export default BillingRightPane;