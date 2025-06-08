import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="title-section">
      <h1 className="title">PokeTool</h1>
      <nav className="nav-links">
        <Link to="/">Random Pokémon</Link>
        <Link to="/guess-cry">Guess the Cry</Link>
        {/* Add more links here as you make more pages */}
      </nav>
    </header>
  );
}

export default Header;
