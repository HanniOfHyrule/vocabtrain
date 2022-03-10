import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!!.toString();
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY!!.toString();
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
