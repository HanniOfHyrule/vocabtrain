import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "./SupabaseClient";
import Login from "./Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, SpeedDial } from "@mui/material";
import ButtonAppBar from "./ButtonAppBar";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { Add } from "@mui/icons-material";
import AddWordForm from "./AddWordForm";

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ButtonAppBar user={user} onLogout={handleLogout} />
        <main>
          <Container sx={{ py: 8 }} maxWidth="md">
            {!user ? (
              <Login supabase={supabase} />
            ) : (
              <>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <div>
                        * use modal to save words * Duolingo-style vocab
                        training
                      </div>
                    }
                  />
                  <Route path="/new" element={<AddWordForm />} />
                </Routes>
                <Link to="/new">
                  <SpeedDial
                    ariaLabel="add new words"
                    sx={{ position: "absolute", bottom: 16, right: 16 }}
                    icon={<Add />}
                  ></SpeedDial>
                </Link>
              </>
            )}
          </Container>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
