import React from 'react';
import DebtTable from "./debt-table";
import { DebtEntry } from "../../models/bill-tracking.model";
import DebtSearchBar from "./components/debt-search.bar";

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
  return (
    <div className="flex flex-col h-full">
      <DebtSearchBar setSearchQuery={setSearchQuery!} deferredSearch={deferredSearch!}/>

      <DebtTable
        displayedTableData={displayedTableData}
        selectedRowId={selectedRowId}
        setSelectedRowId={setSelectedRowId}
        deferredSearch={deferredSearch!}
      />
    </div>
  )
};

export default BillingLeftPane;