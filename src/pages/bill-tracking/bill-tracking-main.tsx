import React from 'react';
import BillTracking from "./components/bill-tracking";
import { BillTrackingProvider } from "./state/context/bill-tracking-provider";

const BillTrackingMain = () => {
  return (
    <BillTrackingProvider>
      <BillTracking/>
    </BillTrackingProvider>
  )
};

export default BillTrackingMain;