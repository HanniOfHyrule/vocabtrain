import { createClient } from "@supabase/supabase-js";
import Word from "./Word";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!!.toString();
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY!!.toString();
const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveWord(word: Word) {
  return supabase.from("words").insert([word]);
}

export default supabase;
