import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { DebtEntryFromDb } from "../../models/bill-tracking.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import {
  formatDate,
  formatSenderReceiver,
  textColorFormat,
  renderSenderReceiverColor, textOpacityFormat, formatAmount
} from "../../state/functions/bill-tracking.functions";
import '../../css/debt-table.css';
import { DebtDirection } from "../../constants/bill-tracking.constants";
import { BillTrackingContext } from "../../state/context/bill-tracking-context";
import { DateTime } from "luxon";
import { completeDebt, deleteArchiveById, sendToArchive } from "../../api/bill-tracking.api";
import { toast } from "react-toastify";
import { errorHandler } from "../../../../global/functions/error-handler/error-handler";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const DebtTable = () => {
  const {
    displayedTableData,
    selectedRowData,
    setSelectedRowData,
    deferredSearch,
    debtDirection,
    deleteFromTableData,
    updateTableData,
    archivedTableData,
    isArchive,
    insertNewArchive,
    deleteFromArchiveTable
  } = useContext(BillTrackingContext);
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);


  const headerClass = "px-6 py-3"
  const cellClassLong = "px-6 py-4 truncate"

  const sortByDate = (tableData: DebtEntryFromDb[]) => {
    const dateType = isArchive ? 'created_at' : 'next_recurrence_date'
    return tableData.sort((a: DebtEntryFromDb, b: DebtEntryFromDb) => {
      const dateA = a[dateType] ? DateTime.fromISO(a[dateType]!) : null;
      const dateB = b[dateType] ? DateTime.fromISO(b[dateType]!) : null;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateA.diff(dateB).as('seconds');
    })
  }

  const filterSearchQuery = (debtItem: DebtEntryFromDb) => {
    let userIsSender: boolean = userId === debtItem.sender_id;

    return (
      debtItem.amount.toString().includes(deferredSearch!) ||
      debtItem.description.toLowerCase().includes(deferredSearch!.toLowerCase()) ||
      (userIsSender ? (
        debtItem.receiver_data.name.toLowerCase().includes(deferredSearch!.toLowerCase())
      ) : (
        debtItem.sender_data.name.toLowerCase().includes(deferredSearch!.toLowerCase())
      ))
    );
  };

  const filterDebtDirection = (debtItem: DebtEntryFromDb) => {
    switch (debtDirection) {
      case (DebtDirection.FROM):
        return debtItem.receiver_id === userId;
      case (DebtDirection.TO):
        return debtItem.sender_id === userId;
      default:
        return true;
    }
  };

  const handleComplete = (selectedRowData: DebtEntryFromDb) => {
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

  const deleteArchive = (debtItem: DebtEntryFromDb) => {
    deleteArchiveById(debtItem.id).then(response => {
      deleteFromArchiveTable(debtItem.id);
      setSelectedRowData(null);
      toast('Success: Archived debt deleted.', { type: 'success' });
    }).catch(error => errorHandler(error));
  }

  return (
    <div className="overflow-auto h-full">
      <table className="w-full text-left text-sm text-gray-300 border-separate border-spacing-0 table-fixed">
        <thead className="text-xs uppercase bg-gray-50 bg-gray-700 text-white sticky top-0">
        <tr>
          <th scope="col" className={headerClass}>To/From</th>
          <th scope="col" className={headerClass}>Amount</th>
          <th scope="col" className={headerClass}>Description</th>
          <th scope="col" className={headerClass}>{`${isArchive ? 'Archive Date' : 'Due Date'}`}</th>
          <th scope="col" className={headerClass}>Frequency</th>
          <th scope="col" className={headerClass}></th>
        </tr>
        </thead>

        <tbody>
        {sortByDate(isArchive ? archivedTableData : displayedTableData)
          .filter(debtItem => filterDebtDirection(debtItem))
          .filter(debtItem => filterSearchQuery(debtItem))
          .map(debtItem => (
            <tr
              key={debtItem.id}
              onClick={() => setSelectedRowData(debtItem)}
              className={`debt-table-row font-medium border-gray-700 hover:bg-gray-500 cursor-pointer ${debtItem.id === selectedRowData?.id ? 'bg-gray-600 debt-table-row-selected' : ''} `}
            >

              {/* Name */}
              <th scope="row"
                  className={`px-6 py-4 font-medium text-white truncate ${textOpacityFormat(debtItem.next_recurrence_date)}`}>
                {`${formatSenderReceiver(userId!, debtItem.sender_id, debtItem.sender_data, debtItem.receiver_data)}`}
              </th>

              {/*Amount*/}
              <td
                className={`px-6 py-4 truncate ${renderSenderReceiverColor(userId!, debtItem.sender_id)} ${textOpacityFormat(debtItem.next_recurrence_date)}`}>
                {`$ ${formatAmount(debtItem.amount)}`}
              </td>

              {/*Description*/}
              <td className={`${cellClassLong} ${textOpacityFormat(debtItem.next_recurrence_date)}`}>
                {debtItem.description}
              </td>

              {/*Due Date*/}
              {isArchive ? (
                <td className={`${cellClassLong}`}>
                  <span>
                    <p>{formatDate(debtItem.created_at)}</p>
                  </span>
                </td>
              ) : (
                <td className={`${cellClassLong} ${textOpacityFormat(debtItem.next_recurrence_date)}`}>
              <span
                className={`flex space-x-2 items-center ${textColorFormat(debtItem.next_recurrence_date)} ${textOpacityFormat(debtItem.next_recurrence_date)}`}>
                <p>{formatDate(debtItem.next_recurrence_date)}</p>
                {textColorFormat(debtItem.next_recurrence_date) && <i className="fa fa-exclamation-triangle"/>}
              </span>
                </td>
              )}

              {/*Frequency*/}
              <td className={`${cellClassLong} ${textOpacityFormat(debtItem.next_recurrence_date)}`}>
                {debtItem.frequency_interval}
              </td>

              {/*Complete*/}
              {!isArchive ? (
                <td className={`pl-12`}>
                  <button className="hover:text-green-500" onClick={() => handleComplete(debtItem)}>
                    <i id={`complete-button-${debtItem.id}`} className="fa fa-check-circle-o"
                       style={{ fontSize: '1.5rem', margin: 0 }}></i>
                  </button>
                  <Tooltip anchorId={`complete-button-${debtItem.id}`} content="Mark as complete" place="top"
                           variant="success"/>
                </td>
              ) : (
                <td className={`pl-12`}>
                  <button className="hover:text-red-500" onClick={() => deleteArchive(debtItem)}>
                    <i id={`delete-button-${debtItem.id}`} className="fa fa-trash"
                       style={{ fontSize: '1.5rem', margin: 0 }}></i>
                  </button>
                  <Tooltip anchorId={`delete-button-${debtItem.id}`} content="Delete" place="top" variant="error"/>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default DebtTable;