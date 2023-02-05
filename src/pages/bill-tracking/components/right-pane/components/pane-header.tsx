import React, { lazy, Suspense, useContext, useState } from 'react';
import {
  formatAmount,
  formatSenderReceiver,
  renderSenderReceiverColor
} from "../../../state/functions/bill-tracking.functions";
import { BillTrackingContext } from "../../../state/context/bill-tracking-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import useDialogHook from "../../../../../global/components/dialog/hooks/use-dialog-hook";
import DialogSpinningLoader from "../../../../../global/components/loading/dialog-spinning-loader";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CreateEditDebtDialog = lazy(() => import("../../../dialog/create-edit-debt-dialog"));

const PaneHeader = () => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const { selectedRowData, isArchive } = useContext(BillTrackingContext);
  const { sender_id, sender_data, receiver_data, amount } = selectedRowData!;

  const { animationClass, modalRef, setOpenDialog, openDialog } = useDialogHook();

  return (
    <div className="flex justify-between flex-wrap">
      <Suspense fallback={<DialogSpinningLoader/>}>
        {openDialog &&
            <CreateEditDebtDialog
                setOpenDialog={setOpenDialog}
                animationClass={animationClass}
                modalRef={modalRef}
                isEdit={true}
            />}
      </Suspense>

      <div>
        <span
          style={{ fontSize: '1.2rem' }}
          className="font-bold">
          {`${formatSenderReceiver(userId!, sender_id, sender_data, receiver_data)} ${isArchive ? '(Archive)' : ''}`}
        </span>
        {!isArchive && (
          <>
            <i
              id="edit-entry-icon"
              onClick={() => setOpenDialog(true)}
              className="fa fa-pencil-square-o hover:text-orange-500 cursor-pointer ml-2"
            />
            <Tooltip anchorId="edit-entry-icon" place="right" content="Edit debt entry" variant="info"/>
          </>
        )}
      </div>

      <p
        style={{ fontSize: '1.5rem' }}
        className={`${renderSenderReceiverColor(userId!, sender_id)} font-bold`}>
        {`$${formatAmount(amount)}`}
      </p>
    </div>
  )
};

export default PaneHeader;