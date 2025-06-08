import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./GuessTheCry.css";

type PokeData = {
  name: string;
  cry: string;
};

async function getRandomPokemonId(): Promise<number> {
  // First, fetch the total count of Pokémon species
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=0');
  const data = await resp.json();
  const count = data.count;
  return Math.floor(Math.random() * count) + 1;
}

async function getPokemon(): Promise<PokeData | null>{
    try {
        const id = await getRandomPokemonId();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) return null;
        const data = await response.json();

        return {
            name: data.name,
            cry: data.cries?.latest 
        };
    } catch {
        return null;
    }
}

function GuessTheCry() {
  const [pokemon, setPokemon] = useState<PokeData | null>(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<string | null>(null);

  // Load a new Pokémon when the game starts or resets
  function newGame() {
    setGuess("");
    setResult(null);
    getPokemon().then(setPokemon);
  }

  useEffect(() => {
    newGame();
  }, []);

  function playCry() {
    if (pokemon && pokemon.cry) {
      //const audio = new Audio(pokemon.cry);
      let defaultAudio = "http://www.sousound.com/music/healing/healing_01.mp3"
      console.log("Playing:", pokemon.cry);
      const audio = new Audio(pokemon.cry)
      audio.volume = 1;
      audio.play();
    }
  }

  function checkGuess(e: React.FormEvent) {
    e.preventDefault();
    if (!pokemon) return;
    if (guess.trim().toLowerCase() === pokemon.name.toLowerCase()) {
      setResult("Correct!");
    } else {
      setResult(`Nope! It was ${pokemon.name}`);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "3rem auto", textAlign: "center" }}>
      <h2 className="page-subtitle">Guess the Pokémon by its Cry!</h2>
      <button
        onClick={playCry}
        disabled={!pokemon || !pokemon.cry}
        style={{ marginBottom: "2rem" }}
      >
        {pokemon ? "Play Cry 🔊" : "Loading..."}
      </button>
      <form onSubmit={checkGuess} style={{ marginTop: "1.5rem" }}>
        <input
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder="Type your guess"
          disabled={!pokemon || !!result}
          style={{ padding: "0.5em", fontSize: "1em" }}
        />
        <button type="submit" disabled={!pokemon || !!result} style={{ marginLeft: "1em" }}>
          Guess
        </button>
      </form>
      {result && (
        <div style={{ marginTop: "2em", fontWeight: "bold", color: result === "Correct!" ? "green" : "#ef5350" }}>
          {result}
          <div>
            <button onClick={newGame} style={{ marginTop: "1.2em" }}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuessTheCry;