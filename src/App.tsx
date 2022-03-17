import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "./SupabaseClient";
import Login from "./Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, CssBaseline } from "@mui/material";
import ButtonAppBar from "./ButtonAppBar";

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
      <ButtonAppBar user={user} onLogout={handleLogout} />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        ></Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {!user ? <Login supabase={supabase} /> : "hello"}
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default App;
