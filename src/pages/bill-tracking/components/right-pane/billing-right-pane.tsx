import React, { useContext } from 'react';
import {
  formatDate
} from "../../state/functions/bill-tracking.functions";
import RowDataItem from "./components/row-data-item";
import NoteTextArea from "./components/note-text-area";
import PaneHeader from "./components/pane-header";
import { BillTrackingContext } from "../../state/context/bill-tracking-context";
import { DateTime } from "luxon";
import { completeDebt, deleteArchiveById, discontinueDebt, sendToArchive } from "../../api/bill-tracking.api";
import { errorHandler } from "../../../../global/functions/error-handler/error-handler";
import { DebtEntryFromDb } from "../../models/bill-tracking.model";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FrequencyOptions } from "../../constants/bill-tracking.constants";

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
      const rowData = { ...updatedRowData };
      if (response === null) {
        deleteFromTableData(updatedRowData.id!);
        setSelectedRowData(null);
      } else {
        updateTableData(response.id, response);
      }
      if (rowData.frequency_interval === null || rowData.frequency_interval === FrequencyOptions.ONE_TIME) {
        toast('Success: Bill archived and completed.', { type: 'success' });
      } else {
        toast(`Success: Bill archived and completed. Next due date has been updated.`, { type: 'success' });
      }
    }).catch(error => errorHandler(error));
  }

  const handleDiscontinue = () => {
    const archiveRowData = { original_id: selectedRowData!.id, ...selectedRowData };
    delete archiveRowData.id;
    delete archiveRowData.sender_data;
    delete archiveRowData.receiver_data;
    delete archiveRowData.created_at;

    sendToArchive(archiveRowData).then(response => {
      insertNewArchive(response);
    }).catch(error => errorHandler(error));

    discontinueDebt(selectedRowData!.id).then(response => {
      deleteFromTableData(selectedRowData!.id);
      setSelectedRowData(null);
      toast('Success: Discontinued recurring bill', { type: 'success' });
    }).catch(error => errorHandler(error));

  }

  const deleteArchive = () => {
    deleteArchiveById(selectedRowData!.id).then(response => {
      deleteFromArchiveTable(selectedRowData!.id);
      setSelectedRowData(null);
      toast('Success: Archived bill deleted.', { type: 'success' });
    }).catch(error => errorHandler(error));
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <PaneHeader/>

        <div className="overflow-auto space-y-4">
          <RowDataItem heading="Description" data={description}/>
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
        <>
          <div className="flex flex-col">
            <button
              className="w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              onClick={handleComplete}
            >
              Mark as complete
            </button>
            {selectedRowData?.frequency_interval !== null && selectedRowData?.frequency_interval !== FrequencyOptions.ONE_TIME &&
                <button
                    className="mt-2 w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                    onClick={handleDiscontinue}
                >
                    Discontinue this recurring bill
                </button>
            }
          </div>
        </>
      )}
    </div>
  )
};

export default BillingRightPane;