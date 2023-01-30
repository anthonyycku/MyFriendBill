import React, { Suspense, useContext, useDeferredValue, useEffect, useState } from 'react';
import DebtTable from "./debt-table";
import { DebtEntry } from "../../models/bill-tracking.model";
import DebtSearchBar from "./components/debt-search.bar";
import EmptyTable from "./components/empty-table";
import CreateButton from "../../../../global/components/buttons/create-button";
import DialogSpinningLoader from "../../../../global/components/loading/dialog-spinning-loader";
import CreateEditDebtDialog from "../../dialog/create-edit-debt-dialog";
import { DebtDirection } from "../../constants/bill-tracking.constants";
import DropdownMenu from "../../../../global/components/menu/dropdown-menu";
import UseDialogHook from "../../../../global/components/dialog/hooks/use-dialog-hook";
import { BillTrackingContext } from "../../state/context/bill-tracking-context";

const BillingLeftPane = () => {
  const {
    displayedTableData,
    setDebtDirection
  } = useContext(BillTrackingContext);

  const { modalRef, setOpenDialog, openDialog, animationClass } = UseDialogHook();

  const debtDirectionList = [
    DebtDirection.ALL,
    DebtDirection.FROM,
    DebtDirection.TO
  ]

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
              <DebtSearchBar/>
              <DropdownMenu
                defaultValue={DebtDirection.ALL}
                setChangeValue={setDebtDirection}
                menuItems={debtDirectionList}
                styles="ml-2"
              />
            </div>

            <div className="flex">
              <CreateButton handleClick={() => setOpenDialog(true)} text="Create new debt"/>
            </div>
          </div>
        )}

        {displayedTableData.length === 0 ? <EmptyTable/> : <DebtTable/>}
      </div>
    </>
  )
};

export default BillingLeftPane;