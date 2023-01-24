import { TransactionData } from "../models/bill-tracking.model";
import { ReactNode } from "react";

export const formatSenderReceiver = (userId: number, sender_id: number, sender_data: TransactionData, receiver_data: TransactionData): string => {
  let resultString: string;
  if (userId === sender_id) {
    resultString = `To: ${receiver_data.name}`
  } else {
    resultString = `From: ${sender_data.name}`
  }
  return resultString;
}

export const renderSenderReceiverColor = (userId: number, sender_id: number, sender_data: TransactionData, receiver_data: TransactionData): string => {
  if (userId === sender_id) {
    return 'text-red-400';
  } else {
    return 'text-green-400';
  }
}