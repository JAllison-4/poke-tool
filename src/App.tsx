import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./Header/Header";
import RandomPokemon from "./RandomPokemon/RandomPokemon";
import GuessTheCry from "./GuessTheCry/GuessTheCry";
// import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <Header />
      <Container className="main-content">
        <Routes>
          <Route path="/" element={<RandomPokemon />} />
          <Route path="/guess-cry" element={<GuessTheCry />} />
          {/* <Route path="/other" element={<OtherPage />} /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;