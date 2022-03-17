import { createClient } from "@supabase/supabase-js";
import Word from "./Word";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!!.toString();
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY!!.toString();
const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveWord(word: Word) {
  const { data, error } = await supabase.from("words").insert([word]);
  console.log(data, error);
  return { data, error };
}

export default supabase;
