import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import RandomPokemon from "./RandomPokemon/RandomPokemon";
import GuessTheCry from "./GuessTheCry/GuessTheCry";
// import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/search-pokemon" element={<RandomPokemon />} />
          <Route path="/guess-cry" element={<GuessTheCry />} />
          {/* <Route path="/other" element={<OtherPage />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
