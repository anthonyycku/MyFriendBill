import React, { useContext, useEffect, useState } from 'react';
import PageContainer from "../../../global/components/container/page-container";
import { getArchiveList, getDebtList } from "../api/bill-tracking.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DebtEntryFromDb } from "../models/bill-tracking.model";
import LoadingDots from "../../../global/components/loading/loading-dots";
import PaneContainer from "../../../global/components/container/pane-container";
import BillingRightPane from "./right-pane/billing-right-pane";
import EmptyInfoPane from "./right-pane/empty-info-pane";
import BillingLeftPane from "./left-pane/billing-left-pane";
import { BillTrackingContext } from "../state/context/bill-tracking-context";
import { errorHandler } from "../../../global/functions/error-handler/error-handler";

const BillTrackingContainer = () => {
  const { setDisplayedTableData, selectedRowData, setArchivedTableData } = useContext(BillTrackingContext)

  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [tableLoading, setTableLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId === null) return;

    getDebtList(userId!).then((response: DebtEntryFromDb[] | null) => {
      setDisplayedTableData(response!);
    }).catch(error => errorHandler(error))
      .finally(() => setTableLoading(false));

    getArchiveList(userId!).then((response: DebtEntryFromDb[] | null) => {
      setArchivedTableData(response!);
    }).catch(error => errorHandler(error));
  }, [userId]);

  return (
    <PageContainer>
      <PaneContainer style="">
        {tableLoading ? <LoadingDots text="Loading table..."/> : <BillingLeftPane/>}
      </PaneContainer>

      <PaneContainer style="md:w-1/3 h-1/3 md:h-full" overflowY>
        {selectedRowData === null ? <EmptyInfoPane/> : <BillingRightPane/>}
      </PaneContainer>
    </PageContainer>
  )
};

export default BillTrackingContainer;