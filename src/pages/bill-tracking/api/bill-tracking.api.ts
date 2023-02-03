import { supabase } from "../../../supabase-config";
import { DebtEntryFromDb, DebtEntryInput } from "../models/bill-tracking.model";
import { UserTableData } from "../../../models/user.model";
import { DateTime } from "luxon";
import { FrequencyOptions } from "../constants/bill-tracking.constants";

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

export async function createCustomUser(userData: Partial<UserTableData>) {
  const { data, error } = await supabase
    .from('user')
    .insert([userData])

  if (error) throw error;

  return data;
}

export async function getArchiveList(userId: number) {

}

export async function sendToArchive(debtData: DebtEntryInput) {
  const { data, error } = await supabase
    .from('archive')
    .insert([debtData])

  if (error) throw error;

  return data;
}

export async function completeDebt(debtData: Partial<DebtEntryFromDb>) {

  if (debtData.next_recurrence_date === null || debtData.frequency_interval === FrequencyOptions.ONE_TIME) {
    const { data, error } = await supabase
      .from('debt')
      .delete()
      .eq('id', debtData.id)

    if (error) throw error;
    return data;

  } else {

    const formatDuration = () => {
      switch (debtData.frequency_interval) {
        case (FrequencyOptions.EVERY_WEEK):
          return { weeks: 1 };
        case (FrequencyOptions.BIWEEKLY):
          return { weeks: 2 };
        case (FrequencyOptions.MONTHLY):
          return { months: 1 };
        case (FrequencyOptions.MONTHLY_TWO):
          return { months: 2 };
        case (FrequencyOptions.MONTHLY_THREE):
          return { months: 3 };
        case (FrequencyOptions.MONTHLY_SIX):
          return { months: 6 };
        default:
          return { years: 1 }
      }
    }

    const updatedDebt = debtData;
    const currentDueDate = updatedDebt.next_recurrence_date;
    updatedDebt.next_recurrence_date = DateTime.fromISO(<string>currentDueDate!).plus(formatDuration()).toISODate();

    const { data, error } = await supabase
      .from('debt')
      .update(updatedDebt)
      .eq('id', debtData.id)
      .select(`*, sender_data: sender_id(id, name), receiver_data: receiver_id(id, name)`)

    if (error) throw error;
    return data;
  }
}