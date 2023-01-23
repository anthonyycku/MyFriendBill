import { supabase } from "../../supabase-config";

export async function checkUser() {
  return await supabase.auth.getUser();
}

export async function createNewUser(name: string, googleId: string) {
  const data = [{ name: name, google_id: googleId }]
  let { error } = await supabase
    .from('user')
    .insert(data);

  if (error) console.error(error);
}

export async function checkUserExists(googleId: string) {
  let { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('google_id', googleId);

  if (error) {
    console.error(error);
    return;
  }
  return data;
}