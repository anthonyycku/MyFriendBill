import React, { useDeferredValue, useEffect, useState } from 'react';
import PageContainer from "../../global/components/container/page-container";
import { getDebtList } from "./api/bill-tracking.api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { DebtEntry } from "./models/bill-tracking.model";
import LoadingDots from "../../global/components/loading/loading-dots";
import PaneContainer from "../../global/components/container/pane-container";
import BillingRightPane from "./components/right-pane/billing-right-pane";
import EmptyInfoPane from "./components/right-pane/empty-info-pane";
import BillingLeftPane from "./components/left-pane/billing-left-pane";

const BillTracking = () => {
  const userDatabaseId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [displayedTableData, setDisplayedTableData] = useState<DebtEntry[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(true);

  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);


  useEffect(() => {
    if (userDatabaseId === null) return;

    getDebtList(userDatabaseId!).then((response: DebtEntry[] | null) => {
      setDisplayedTableData(response!);
    }).catch(error => console.error(error))
      .finally(() => setTableLoading(false));
  }, [userDatabaseId]);

  const getSelectedRowData = (id: number): DebtEntry => {
    const index = displayedTableData.findIndex(entry => entry.id === id);
    return displayedTableData[index];
  }

  return (
    <PageContainer>
      <PaneContainer width="w-3/4">
        {tableLoading ? (
          <LoadingDots text="Loading table..."/>
        ) : (
          <BillingLeftPane
            displayedTableData={displayedTableData}
            selectedRowId={selectedRowId}
            setSelectedRowId={setSelectedRowId}
          />
        )}
      </PaneContainer>

      <PaneContainer width="w-1/4" overflowY>
        {selectedRowId === null ? (
          <EmptyInfoPane/>
        ) : (
          <BillingRightPane selectedRowData={getSelectedRowData(selectedRowId!)}/>
        )}
      </PaneContainer>
    </PageContainer>
  )
};

export default BillTracking;