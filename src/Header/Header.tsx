import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Header() {
  return (
    <AppBar position="static" sx={{ background: "#2b2c30", height: "5rem", justifyContent: "center", paddingX: 2 }}>
      <Toolbar disableGutters sx={{ position: "relative" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            letterSpacing: 2,
            color: "#ef5350",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          PokeTool
        </Typography>
        <Box sx={{ marginLeft: "auto", display: "flex", gap: "1.5em" }}>
          <Button
            component={Link}
            to="/search-pokemon"
            sx={{ color: "#ef5350", textTransform: "none", fontWeight: 600, fontSize: "1.1em" }}
          >
            Search Pokemon
          </Button>
          <Button
            component={Link}
            to="/guess-cry"
            sx={{ color: "#ef5350", textTransform: "none", fontWeight: 600, fontSize: "1.1em" }}
          >
            Guess the Cry
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
