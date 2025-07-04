import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#2b2c30",
        height: "5rem",
        justifyContent: "center",
        paddingX: 2,
        width: "100%",
      }}
    >
      <Toolbar disableGutters sx={{ position: "relative", width: "100%" }}>
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
          PokéTool
        </Typography>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            gap: { xs: 1, sm: "1em" },
            flexWrap: { xs: "wrap", sm: "nowrap" },
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "center", sm: "flex-end" },
          }}
        >
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#ef5350",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1em",
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/team-analyzer"
            sx={{
              color: "#ef5350",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1em",
            }}
          >
            Team Analyzer
          </Button>
          <Button
            component={Link}
            to="/search-pokemon"
            sx={{
              color: "#ef5350",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1em",
            }}
          >
            Search Pokémon
          </Button>
          <Button
            component={Link}
            to="/guess-cry"
            sx={{
              color: "#ef5350",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1em",
            }}
          >
            Guess the Cry
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
