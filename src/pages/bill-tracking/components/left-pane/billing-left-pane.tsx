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

const CreateEditDebtDialog = lazy(() => import("../../dialog/create-edit-debt-dialog"));

const BillingLeftPane = () => {
  const {
    displayedTableData,
    setDebtDirection,
    debtDirection,
    isArchive
  } = useContext(BillTrackingContext);

  const { modalRef, setOpenDialog, openDialog, animationClass } = UseDialogHook();

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
      </Suspense>

      <div className="flex flex-col h-full">

        {displayedTableData.length > 0 && (
          <div className="flex justify-between mb-2 flex-wrap">
            <div className="flex items-center">
              <ArchiveToggleButton/>
              <DebtSearchBar/>
              <DropdownMenu
                value={debtDirection}
                setChangeValue={setDebtDirection}
                menuItems={debtDirectionList}
              />
            </div>

            <div className="flex mt-2 sm:mt-0">
              {!isArchive && (
                <CreateButton handleClick={() => setOpenDialog(true)} text="Create new debt"/>
              )}
            </div>
          </div>
        )}

        {displayedTableData.length === 0 ? <EmptyTable/> : <DebtTable/>}
      </div>
    </>
  )
};

export default BillingLeftPane;