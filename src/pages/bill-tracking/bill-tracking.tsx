import React from 'react';
import BillTrackingContainer from "./components/bill-tracking-container";
import { BillTrackingProvider } from "./state/context/bill-tracking-context";

const BillTracking = () => {
  return (
    <BillTrackingProvider>
      <BillTrackingContainer/>
    </BillTrackingProvider>
  )
};

export default BillTracking;