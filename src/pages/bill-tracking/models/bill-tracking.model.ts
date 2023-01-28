export interface TransactionData {
  id: number;
  name: string;
}

export interface DebtEntry {
  id: number;
  amount: number;
  created_at: Date;
  completed: boolean;
  description: string;
  frequency_interval?: number;
  next_recurrence_date: Date;
  sender_id: number;
  receiver_id: number;
  sender_data: TransactionData;
  receiver_data: TransactionData;
  note: string;
}
