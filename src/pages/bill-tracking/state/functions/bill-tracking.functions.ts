import { TransactionData } from "../../models/bill-tracking.model";

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

const getDaysDifference = (dueDate: Date) => {
  const today = new Date();
  const timeDiff = dueDate.getTime() - today.getTime();
  const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
}

export const formatDate = (next_recurrence_date: Date | null): string => {
  if (next_recurrence_date === null) {
    return 'No due date';
  }

  const dueDate = new Date(next_recurrence_date);
  const daysDiff = getDaysDifference(dueDate);

  if (daysDiff === 0) {
    return `${dueDate.toLocaleDateString()} (Today)`
  } else if (daysDiff > 0) {
    return `${dueDate.toLocaleDateString()} (In ${daysDiff} day${daysDiff === 1 ? '' : 's'})`
  } else {
    const daysDiffAbsolute = Math.abs(daysDiff);
    return `${dueDate.toLocaleDateString()} (${daysDiffAbsolute} day${daysDiffAbsolute === 1 ? '' : 's'} ago)`
  }
}

export const pastDueDate = (next_recurrence_date: Date | null): string => {
  if (next_recurrence_date === null) {
    return '';
  }

  const dueDate = new Date(next_recurrence_date);
  const daysDiff = getDaysDifference(dueDate);

  if (daysDiff <= 0) {
    return 'text-orange-400'
  }
  return '';
}

export const handleCreateNewEntry = () => {
};

