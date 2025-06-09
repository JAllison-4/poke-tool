import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import SearchPokemon from "./Pages/SearchPokemon/SearchPokemon"
import GuessTheCry from "./Pages/GuessTheCry";
// import OtherPage from "./OtherPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/search-pokemon" element={<SearchPokemon />} />
          <Route path="/guess-cry" element={<GuessTheCry />} />
          {/* <Route path="/other" element={<OtherPage />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
