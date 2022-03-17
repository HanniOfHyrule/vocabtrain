import { FlagCircle, Logout } from "@mui/icons-material";
import { Box, Toolbar, Typography, Button, AppBar } from "@mui/material";
import { User } from "@supabase/supabase-js";

interface AppBarProperties {
  user: null | User;
  onLogout: () => void;
}

export default function ButtonAppBar(props: AppBarProperties) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <FlagCircle sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
            noWrap
          >
            Vocabtrain
          </Typography>
          {props.user ? (
            <Button color="inherit" onClick={props.onLogout}>
              <Logout></Logout>
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
