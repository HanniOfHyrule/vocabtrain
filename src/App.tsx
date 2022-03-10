import React, { useEffect, useState } from "react";
import "./App.css";
import { User } from "@supabase/supabase-js";
import supabase from "./SupabaseClient";
import Login from "./Login";

function App() {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    supabase.auth.signOut().catch(console.error);
  };

  return (
    <div className="App">
      {!user ? (
        <Login supabase={supabase} />
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default App;
