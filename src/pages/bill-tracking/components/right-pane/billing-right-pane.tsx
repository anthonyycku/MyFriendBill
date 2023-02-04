import React, { useContext } from 'react';
import {
  formatDate
} from "../../state/functions/bill-tracking.functions";
import RowDataItem from "./components/row-data-item";
import NoteTextArea from "./components/note-text-area";
import PaneHeader from "./components/pane-header";
import { BillTrackingContext } from "../../state/context/bill-tracking-context";
import { DateTime } from "luxon";
import { completeDebt, deleteArchiveById, sendToArchive } from "../../api/bill-tracking.api";
import { errorHandler } from "../../../../global/functions/error-handler/error-handler";
import { DebtEntryFromDb } from "../../models/bill-tracking.model";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BillingRightPane = () => {
  const {
    selectedRowData,
    updateTableData,
    deleteFromTableData,
    setSelectedRowData,
    isArchive,
    insertNewArchive,
    deleteFromArchiveTable
  } = useContext(BillTrackingContext);

  const {
    description,
    created_at,
    next_recurrence_date,
    frequency_interval
  } = selectedRowData!;

  const handleComplete = () => {
    const updatedRowData: Partial<DebtEntryFromDb> = { ...selectedRowData };
    delete updatedRowData.receiver_data;
    delete updatedRowData.sender_data;
    delete updatedRowData.created_at;

    const archiveRowData = { original_id: selectedRowData!.id, ...updatedRowData };
    delete archiveRowData.id;

    sendToArchive(archiveRowData).then(response => {
      insertNewArchive(response);
    }).catch(error => errorHandler(error));

    completeDebt(updatedRowData!).then((response: DebtEntryFromDb) => {
      if (response === null) {
        deleteFromTableData(updatedRowData.id!);
        setSelectedRowData(null);
      } else {
        updateTableData(response.id, response);
      }
      toast(`Success: Debt archived and completed. Next due date has been updated.`, { type: 'success' })
    }).catch(error => errorHandler(error));
  }

  const deleteArchive = () => {
    deleteArchiveById(selectedRowData!.id).then(response => {
      deleteFromArchiveTable(selectedRowData!.id);
      setSelectedRowData(null);
      toast('Success: Archived debt deleted.', { type: 'success' });
    }).catch(error => errorHandler(error));
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <PaneHeader/>

        <div className="overflow-auto space-y-4">
          <RowDataItem heading="Description" data={description} inline={false}/>
          <RowDataItem heading={isArchive ? "Archive Date" : "Creation Date"}
                       data={DateTime.fromISO(created_at).toFormat("MM/dd/yyyy, HH:mm")}/>
          <RowDataItem heading="Due Date" data={formatDate(next_recurrence_date)} rawData={next_recurrence_date}/>
          <RowDataItem heading="Frequency" data={frequency_interval}/>

          <NoteTextArea/>
        </div>
      </div>

      {isArchive ? (
        <div className="self-center w-full">
          <button
            className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
            onClick={deleteArchive}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="self-center w-full">
          <button
            className="w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            onClick={handleComplete}
          >
            Mark as complete
          </button>
        </div>
      )}
    </div>
  )
};

export default BillingRightPane;