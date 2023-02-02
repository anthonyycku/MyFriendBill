import { supabase } from "../../../supabase-config";
import { DebtEntryValidation, DebtEntry } from "../models/bill-tracking.model";

export async function getDebtList(userDatabaseId: number) {
  const { data: debt, error } = await supabase
    .from('debt')
    .select(`*, sender_data: sender_id(id, name), receiver_data: receiver_id(id, name)`)
    .or(`sender_id.eq.${userDatabaseId}, receiver_id.eq.${userDatabaseId}`)
    .order('next_recurrence_date', { ascending: true })

  if (error) throw error;

  return debt;
}

export async function updateNote(debtId: number, note: string) {
  const { data, error } = await supabase
    .from('debt')
    .update({ note: note })
    .eq("id", debtId)

  if (error) throw error;

  return data;
}

export async function getUsersList() {
  const { data: user, error } = await supabase
    .from('user')
    .select('id, name')

  if (error) throw error;

  return user;
}

export async function createNewDebt(debtData: DebtEntryValidation) {
  const { data, error } = await supabase
    .from('debt')
    .insert([debtData])

  if (error) throw error;

  return data;
}

export async function updateDebt(debtData: DebtEntryValidation) {
  const { data, error } = await supabase
    .from('debt')
    .update(debtData)

  if (error) throw error;

  return data;
}