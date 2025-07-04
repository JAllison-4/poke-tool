import React, { useState, useEffect } from "react";
import { Alert, Box, Button, Typography, Chip } from "@mui/material";
import PokemonCard from "../Components/PokemonCard";
import SearchBox from "../Components/SearchBox";
import allPokemonNames from "../Data/pokemon-names.json";
import { fetchRandomPokemon, capitalize, PokeData } from "../utils/pokemon";

function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function GuessTheCry() {
  if (isSafari()) {
    return (
      <Alert
        severity="warning"
        sx={{ maxWidth: 420, m: "3rem auto", textAlign: "center" }}
      >
        Sorry, this game is not supported on Safari. Please try a different
        browser like Chrome or Firefox.
      </Alert>
    );
  }

  const MAX_ATTEMPTS = 5;
  const [pokemon, setPokemon] = useState<PokeData | null>(null);
  const [guess, setGuess] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  function newGame() {
    setGuess(null);
    setAttempts(0);
    setResult(null);
    setPreviousGuesses([]);
    fetchRandomPokemon().then(setPokemon);
  }

  useEffect(() => {
    newGame();
  }, []);

  function playCry() {
    if (pokemon && pokemon.cry) {
      console.log("Playing:", pokemon.cry);
      const audio = new Audio(pokemon.cry);
      audio.volume = 0.5;
      audio.play();
    }
  }

  function checkGuess(e: React.FormEvent) {
    e.preventDefault();
    if (!pokemon || !guess) return;
    setPreviousGuesses((prev) => [...prev, guess]);
    if (guess.trim().toLowerCase() === pokemon.name.toLowerCase()) {
      setResult("Correct!");
    } else {
      const next = attempts + 1;
      if (next >= MAX_ATTEMPTS) {
        setResult(`Nope! It was ${capitalize(pokemon.name)}`);
      } else {
        setAttempts(next);
      }
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
        <SearchBox
          options={allPokemonNames.map(capitalize)}
          value={guess ? capitalize(guess) : null}
          onChange={(v) => setGuess(v ? v.toLowerCase() : null)}
          label="Your Guess"
        />
        <Button
          type="submit"
          disabled={!pokemon || !!result || !guess}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Guess
        </Button>
      </Box>
      {previousGuesses.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {previousGuesses.map((g, idx) => (
            <Chip key={idx} label={capitalize(g)} sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>
      )}
      {!result && attempts > 0 && (
        <Typography sx={{ mt: 1, color: "#ef5350" }}>
          Incorrect! {MAX_ATTEMPTS - attempts} guesses left.
        </Typography>
      )}
      {result && (
        <Box
          sx={{
            mt: 2,
            fontWeight: "bold",
            color: result === "Correct!" ? "green" : "#ef5350",
          }}
        >
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
