import { supabase } from "../../supabase-config";

export async function checkUser() {
  const { data } = await supabase.auth.getUser();

  return data;
}

export async function createNewUser(name: string, googleId: string) {
  const sendData = [{ name: name, google_id: googleId }]
  let { data, error } = await supabase
    .from('user')
    .insert(sendData)
    .select('*');

  if (error) throw error;

  return data;
}

export async function checkUserExists(googleId: string) {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('google_id', googleId);

  if (error) throw error;

  return data;
}