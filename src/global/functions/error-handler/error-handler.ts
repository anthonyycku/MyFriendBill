import { PostgrestError } from "@supabase/supabase-js";
import { toast } from "react-toastify";

export function errorHandler(error: PostgrestError, setLoading?: (load: boolean) => void) {
  if (setLoading) setLoading(false);
  toast(`Failed: ${error.message}`, {
    type: 'error'
  })
  console.error(error.message);
}