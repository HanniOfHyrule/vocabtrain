import { SupabaseClient } from "@supabase/supabase-js";

type LoginProps = {
  supabase: SupabaseClient;
};

export default function Login(props: LoginProps) {
  const handleSignInWithDiscord = async () => {
    await props.supabase.auth.signIn({ provider: "discord" });
  };

  return (
    <div className="Login">
      Login with
      <button onClick={handleSignInWithDiscord}>Discord</button>
    </div>
  );
}
