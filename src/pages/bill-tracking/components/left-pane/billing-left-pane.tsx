import React, { Suspense, useDeferredValue, useEffect, useState } from 'react';
import DebtTable from "./debt-table";
import { DebtEntry } from "../../models/bill-tracking.model";
import DebtSearchBar from "./components/debt-search.bar";
import EmptyTable from "./components/empty-table";
import CreateButton from "../../../../global/components/buttons/create-button";
import DialogSpinningLoader from "../../../../global/components/loading/dialog-spinning-loader";
import CreateDebtDialog from "../../dialog/create-debt-dialog";
import { DebtDirection } from "../../constants/bill-tracking.constants";
import DropdownMenu from "../../../../global/components/menu/dropdown-menu";
import UseDialogHook from "../../../../global/components/dialog/hooks/use-dialog-hook";

export interface DebtTableProps {
  displayedTableData: DebtEntry[];
  selectedRowId: number | null;
  setSelectedRowId: (id: number) => void;
  deferredSearch?: string;
  debtDirection?: string;
}

const BillingLeftPane = ({
                           displayedTableData,
                           selectedRowId,
                           setSelectedRowId
                         }: DebtTableProps) => {
  const [debtDirection, setDebtDirection] = useState<string>(DebtDirection.ALL);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearch: string = useDeferredValue(searchQuery!)

  const { modalRef, setOpenDialog, openDialog, animationClass } = UseDialogHook();

  const debtDirectionList = [
    { name: DebtDirection.ALL, action: () => setDebtDirection(DebtDirection.ALL) },
    { name: DebtDirection.FROM, action: () => setDebtDirection(DebtDirection.FROM) },
    { name: DebtDirection.TO, action: () => setDebtDirection(DebtDirection.TO) }
  ]

  return (
    <>
      <Suspense fallback={<DialogSpinningLoader/>}>
        {openDialog && <CreateDebtDialog animationClass={animationClass} modalRef={modalRef}/>}
      </Suspense>

      <div className="flex flex-col h-full">

        {displayedTableData.length > 0 && (
          <div className="flex justify-between mb-2 flex-wrap">
            <div className="flex items-center">
              <DebtSearchBar setSearchQuery={setSearchQuery!} deferredSearch={deferredSearch!}/>
              <DropdownMenu
                setChangeValue={setDebtDirection}
                defaultValue={DebtDirection.ALL}
                menuItems={debtDirectionList}
                ml={2}
              />
            </div>
            <div className="flex">
              <CreateButton handleClick={() => setOpenDialog(true)} text="Create new debt"/>
            </div>
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
            debtDirection={debtDirection}
          />
        )}
      </div>
    </>
  )
};

export default BillingLeftPane;