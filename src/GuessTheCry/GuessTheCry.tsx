import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
    <Box sx={{ maxWidth: 420, m: "3rem auto", textAlign: "center" }}>
      <Typography variant="h6" className="page-subtitle">
        Guess the Pokémon by its Cry!
      </Typography>
      <Button
        onClick={playCry}
        disabled={!pokemon || !pokemon.cry}
        sx={{ mb: 2 }}
        variant="contained"
      >
        {pokemon ? "Play Cry 🔊" : "Loading..."}
      </Button>
      <Box component="form" onSubmit={checkGuess} sx={{ mt: 1.5 }}>
        <TextField
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your guess"
          disabled={!pokemon || !!result}
          size="small"
        />
        <Button
          type="submit"
          disabled={!pokemon || !!result}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Guess
        </Button>
      </Box>
      {result && (
        <Box sx={{ mt: 2, fontWeight: "bold", color: result === "Correct!" ? "green" : "#ef5350" }}>
          {result}
          <Box>
            <Button onClick={newGame} sx={{ mt: 1.2 }}>
              Play Again
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default GuessTheCry;
