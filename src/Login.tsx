import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { SupabaseClient } from "@supabase/supabase-js";

type LoginProps = {
  supabase: SupabaseClient;
};

export default function Login(props: LoginProps) {
  const handleSignInWithDiscord = async () => {
    await props.supabase.auth.signIn(
      {
        provider: "discord",
      },
      {
        redirectTo: window.location.origin,
      }
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Vocabtrain
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Tired of working through a lot of vocabulary that you already know?
          Want to learn words you really need and want to memorize?
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Skip the hassle and use Vocabtrain to learn just the vocubulary you
          need!
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={handleSignInWithDiscord}>
            Login with Discord
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
