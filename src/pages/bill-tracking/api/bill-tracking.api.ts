import { supabase } from "../../../supabase-config";

export async function getDebtList(userDatabaseId: number) {
  const { data: debt, error } = await supabase
    .from('debt')
    .select(`*, sender_data: sender_id(id, name), receiver_data: receiver_id(id, name)`)
    .or(`sender_id.eq.${userDatabaseId}, receiver_id.eq.${userDatabaseId}`)
    .order('next_recurrence_date', { ascending: true })

  if (error) throw error;

  return debt;
}

export async function updateDebt(id: number) {

}