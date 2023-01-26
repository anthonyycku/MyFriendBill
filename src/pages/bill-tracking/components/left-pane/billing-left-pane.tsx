import React from 'react';
import DebtTable from "./debt-table";
import { DebtEntry } from "../../models/bill-tracking.model";
import DebtSearchBar from "./components/debt-search.bar";
import EmptyTable from "./components/empty-table";
import CreateButton from "../../../../global/components/buttons/create-button";
import { handleCreateNewEntry } from "../../functions/bill-tracking.functions";

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

      {displayedTableData.length > 0 && (
        <div className="flex justify-between mb-2">
          <DebtSearchBar setSearchQuery={setSearchQuery!} deferredSearch={deferredSearch!}/>
          <CreateButton handleClick={handleCreateNewEntry} text="Create new debt"/>
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
  )
};

export default BillingLeftPane;