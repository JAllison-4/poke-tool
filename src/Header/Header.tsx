import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Header.css";

function Header() {
  return (
    <AppBar position="static" className="title-section">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="title">
          PokeTool
        </Typography>
        <nav className="nav-links">
          <Button color="inherit" component={Link} to="/">
            Random Pokémon
          </Button>
          <Button color="inherit" component={Link} to="/guess-cry">
            Guess the Cry
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
