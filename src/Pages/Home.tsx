import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        m: "4rem auto",
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        background: "rgba(34,36,43,0.95)",
        boxShadow: "0 2px 12px #000a"
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, color: "#ef5350", fontWeight: 800 }}>
        Welcome to PokéTool!
      </Typography>
      <Typography sx={{ mb: 3, color: "#eee" }}>
        The best toolkit for Pokémon fans! <br />
        <br />
        - Search Pokémon by name<br />
        - Play “Guess the Cry”<br />
        - Analyze your team’s strengths and weaknesses<br />
        - (And more features coming soon!)
      </Typography>
      <Button
        component={Link}
        to="/search-pokemon"
        variant="contained"
        color="primary"
        sx={{ mr: 2 }}
      >
        Search Pokémon
      </Button>
      <Button
        component={Link}
        to="/guess-cry"
        variant="outlined"
        color="secondary"
        sx={{ mr: 2 }}
      >
        Guess the Cry
      </Button>
      <Button
        component={Link}
        to="/team-analyzer"
        variant="outlined"
        color="secondary"
        sx={{ mr: 2 }}
      >
        Analyze your Team
      </Button>
    </Box>
  );
}
