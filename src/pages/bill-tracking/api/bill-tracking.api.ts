import { supabase } from "../../../supabase-config";
import { DebtEntryInput } from "../models/bill-tracking.model";
import { UserTableData } from "../../../models/user.model";

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

export async function getUsersList(userId: number) {
  const { data: user, error } = await supabase
    .from('user')
    .select('id, name, owner_id')
    .or(`owner_id.eq.${userId}, owner_id.is.null`)

  if (error) throw error;

  return user;
}

export async function createNewDebt(debtData: DebtEntryInput) {
  const { data, error } = await supabase
    .from('debt')
    .insert([debtData])
    .select(`*, sender_data: sender_id(id, name), receiver_data: receiver_id(id, name)`)

  if (error) throw error;

  return data[0];
}

export async function updateDebt(debtData: DebtEntryInput) {
  const { data, error } = await supabase
    .from('debt')
    .update(debtData)
    .eq("id", debtData.id)
    .select(`*, sender_data: sender_id(id, name), receiver_data: receiver_id(id, name)`)

  if (error) throw error;

  return data[0];
}

export async function createDummyUser(debtData: UserTableData) {

}