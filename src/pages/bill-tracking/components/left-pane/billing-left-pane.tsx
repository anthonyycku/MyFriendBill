import React, { lazy, Suspense, useContext } from 'react';
import DebtTable from "./debt-table";
import DebtSearchBar from "./components/debt-search.bar";
import EmptyTable from "./components/empty-table";
import CreateButton from "../../../../global/components/buttons/create-button";
import DialogSpinningLoader from "../../../../global/components/loading/dialog-spinning-loader";
import { DebtDirection } from "../../constants/bill-tracking.constants";
import DropdownMenu from "../../../../global/components/menu/dropdown-menu";
import UseDialogHook from "../../../../global/components/dialog/hooks/use-dialog-hook";
import { BillTrackingContext } from "../../state/context/bill-tracking-context";
import ArchiveToggleButton from "./components/archive-toggle-button";
import useDialogHook from "../../../../global/components/dialog/hooks/use-dialog-hook";


const CreateEditDebtDialog = lazy(() => import("../../dialog/create-edit-debt-dialog"));
const BillSummaryDialog = lazy(() => import("../../dialog/bill-summary-dialog"));

const BillingLeftPane = () => {
  const {
    displayedTableData,
    setDebtDirection,
    debtDirection,
    isArchive,
    archivedTableData
  } = useContext(BillTrackingContext);

  const { modalRef, setOpenDialog, openDialog, animationClass } = UseDialogHook();
  const {
    modalRef: summaryModalRef,
    setOpenDialog: setOpenSummaryDialog,
    openDialog: openSummaryDialog,
    animationClass: summaryAnimationClass
  } = useDialogHook();

  const debtDirectionList = [
    DebtDirection.ALL,
    DebtDirection.FROM,
    DebtDirection.TO
  ];

  return (
    <>
      <Suspense fallback={<DialogSpinningLoader/>}>
        {openDialog &&
            <CreateEditDebtDialog animationClass={animationClass} modalRef={modalRef} setOpenDialog={setOpenDialog}/>}
        {openSummaryDialog &&
            <BillSummaryDialog animationClass={summaryAnimationClass} modalRef={summaryModalRef}
                               setOpenDialog={setOpenSummaryDialog}/>}
      </Suspense>

      <div className="flex flex-col h-full">

        {(displayedTableData.length > 0 || archivedTableData.length > 0) && (
          <div className="flex mb-2 justify-between">
            <div className="flex flex-col lg:flex-row space-y-1 lg:space-y-0">
              <ArchiveToggleButton/>
              <DebtSearchBar/>
              <DropdownMenu value={debtDirection} setChangeValue={setDebtDirection} menuItems={debtDirectionList}/>
            </div>

            <div className="flex flex-col-reverse justify-end lg:flex-row space-x-0 lg:space-x-2">
              <button
                type="button"
                className="mt-1 lg:mt-0 truncate min-h-[40px] space-x-2 text-blue-500 border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 text-center border-blue-500 hover:text-white hover:bg-blue-600"
                onClick={() => setOpenSummaryDialog(true)}
              >
                Bill Summary
              </button>
              {!isArchive && (
                <CreateButton handleClick={() => setOpenDialog(true)} text="Create new bill"/>
              )}

            </div>
          </div>
        )}

        {displayedTableData.length === 0 && archivedTableData.length === 0 ? <EmptyTable/> : <DebtTable/>}
      </div>
    </>
  )
};

export default BillingLeftPane;