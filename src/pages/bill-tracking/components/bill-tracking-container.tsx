import React, { useContext, useEffect, useState } from 'react';
import PageContainer from "../../../global/components/container/page-container";
import { getDebtList } from "../api/bill-tracking.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DebtEntry } from "../models/bill-tracking.model";
import LoadingDots from "../../../global/components/loading/loading-dots";
import PaneContainer from "../../../global/components/container/pane-container";
import BillingRightPane from "./right-pane/billing-right-pane";
import EmptyInfoPane from "./right-pane/empty-info-pane";
import BillingLeftPane from "./left-pane/billing-left-pane";
import { BillTrackingContext } from "../state/context/bill-tracking-context";

const BillTrackingContainer = () => {
  const { setDisplayedTableData, selectedRowData } = useContext(BillTrackingContext)

  const userDatabaseId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [tableLoading, setTableLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userDatabaseId === null) return;

    getDebtList(userDatabaseId!).then((response: DebtEntry[] | null) => {
      setDisplayedTableData(response!);
    }).catch(error => console.error(error))
      .finally(() => setTableLoading(false));
  }, [userDatabaseId]);

  return (
    <PageContainer>
      <PaneContainer width="w-3/4">
        {tableLoading ? <LoadingDots text="Loading table..."/> : <BillingLeftPane/>}
      </PaneContainer>

      <PaneContainer width="w-1/4" overflowY>
        {selectedRowData === null ? <EmptyInfoPane/> : <BillingRightPane/>}
      </PaneContainer>
    </PageContainer>
  )
};

export default BillTrackingContainer;