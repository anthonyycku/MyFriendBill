export interface TransactionData {
  id: number;
  name: string;
}

export interface DebtEntryFromDb {
  original_id?: number;
  id: number;
  amount: number;
  created_at: string;
  description: string;
  frequency_interval: string | null;
  next_recurrence_date: string | null;
  sender_id: number;
  receiver_id: number;
  sender_data: TransactionData;
  receiver_data: TransactionData;
  note: string;
}

export interface DebtEntryInput {
  id?: number;
  amount: number;
  description: string;
  frequency_interval?: string | null;
  next_recurrence_date: Date | string | null;
  sender_id: number;
  receiver_id: number;
  note: string;
}
