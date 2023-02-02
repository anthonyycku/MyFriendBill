export interface TransactionData {
  id: number;
  name: string;
}

export interface DebtEntry {
  id: number;
  amount: number;
  created_at: string;
  completed: boolean;
  description: string;
  frequency_interval: string | null;
  next_recurrence_date: string | null;
  sender_id: number;
  receiver_id: number;
  sender_data: TransactionData;
  receiver_data: TransactionData;
  note: string;
}

export interface DebtEntryValidation {
  id?: number;
  amount: number;
  description: string;
  frequency_interval?: string | null;
  next_recurrence_date: Date | null;
  sender_id: number;
  receiver_id: number;
  note: string;
}
