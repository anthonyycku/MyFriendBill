import { supabase } from "../../../supabase-config";

export async function getDebtList(userDatabaseId: number | null) {
  const { data: debt, error } = await supabase
    .from('debt')
    .select(`*, sender_data: sender_id(id, name), receiver_data: receiver_id(id, name) `)

  if (error) throw error;

  return debt;
}