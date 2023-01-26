import React, { Suspense } from 'react';
import DebtTable from "./debt-table";
import { DebtEntry } from "../../models/bill-tracking.model";
import DebtSearchBar from "./components/debt-search.bar";
import EmptyTable from "./components/empty-table";
import CreateButton from "../../../../global/components/buttons/create-button";
import { handleCreateNewEntry } from "../../functions/bill-tracking.functions";
import UseDialogHook from "../../../../global/components/dialog/hooks/use-dialog-hook";
import DialogSpinningLoader from "../../../../global/components/loading/dialog-spinning-loader";
import CreateDebtDialog from "../../dialog/create-debt-dialog";

export interface DebtTableProps {
  displayedTableData: DebtEntry[];
  selectedRowId: number | null;
  setSelectedRowId: (id: number) => void;
  setSearchQuery?: (query: string) => void;
  deferredSearch?: string
}

const BillingLeftPane = ({
                           displayedTableData,
                           selectedRowId,
                           setSelectedRowId,
                           setSearchQuery,
                           deferredSearch
                         }: DebtTableProps) => {
  const { modalRef, setOpenDialog, openDialog, animationClass } = UseDialogHook();

  return (
    <>
      <Suspense fallback={<DialogSpinningLoader/>}>
        {openDialog && <CreateDebtDialog animationClass={animationClass} modalRef={modalRef}/>}
      </Suspense>

      <div className="flex flex-col h-full">

        {displayedTableData.length > 0 && (
          <div className="flex justify-between mb-2">
            <DebtSearchBar setSearchQuery={setSearchQuery!} deferredSearch={deferredSearch!}/>
            <CreateButton handleClick={() => setOpenDialog(true)} text="Create new debt"/>
          </div>
        )}

        {displayedTableData.length === 0 ? (
          <EmptyTable/>
        ) : (
          <DebtTable
            displayedTableData={displayedTableData}
            selectedRowId={selectedRowId}
            setSelectedRowId={setSelectedRowId}
            deferredSearch={deferredSearch!}
          />
        )}
      </div>
    </>
  )
};

export default BillingLeftPane;