import { DebtEntryFromDb, TransactionData } from "../../models/bill-tracking.model";
import { DateTime, Duration } from 'luxon';

export const formatSenderReceiver = (userId: number, sender_id: number, sender_data: TransactionData, receiver_data: TransactionData): string => {
  let resultString: string;
  if (userId === sender_id) {
    resultString = `To: ${receiver_data.name}`
  } else {
    resultString = `From: ${sender_data.name}`
  }
  return resultString;
}

export const renderSenderReceiverColor = (userId: number, sender_id: number): string => {
  if (userId === sender_id) {
    return 'text-red-400';
  } else {
    return 'text-green-400';
  }
}

export const formatDate = (next_recurrence_date: string | null): string => {
  if (next_recurrence_date === null) return 'No due date';


  const dueDate = DateTime.fromISO(next_recurrence_date).startOf("day");
  const today = DateTime.local();
  let { days } = dueDate.diff(today, 'days').toObject();
  days = Math.ceil(days!);

  if (days === 0) {
    return `${dueDate.toFormat("MM/dd/yyyy")} (Today)`
  } else if (days! > 0) {
    return `${dueDate.toFormat("MM/dd/yyyy")} (In ${days} day${days === 1 ? '' : 's'})`
  } else {
    const daysDiffAbsolute = Math.abs(days!);
    return `${dueDate.toFormat("MM/dd/yyyy")} (${daysDiffAbsolute} day${daysDiffAbsolute === 1 ? '' : 's'} ago)`
  }
}

export const textColorFormat = (next_recurrence_date: string | null): string => {
  if (next_recurrence_date === null) return '';

  const dueDate = DateTime.fromISO(next_recurrence_date);
  const today = DateTime.local();
  let { days } = dueDate.diff(today, 'days').toObject();
  days = Math.ceil(days!);

  if (days! <= 0) return 'text-orange-400'

  return '';
}

export const textOpacityFormat = (next_recurrence_date: string | null): string => {
  if (next_recurrence_date === null) return '';

  const dueDate = DateTime.fromISO(next_recurrence_date);
  const today = DateTime.local();
  let { days } = dueDate.diff(today, 'days').toObject();
  days = Math.ceil(days!);

  if (days! < 0) return 'text-opacity-50';

  return '';
}

export const formatAmount = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

