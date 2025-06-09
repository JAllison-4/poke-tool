import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./RandomPokemon.css";

type PokeData = {
  name: string;
  types: string[];
  sprite: string;
};

async function getRandPokemon(): Promise<PokeData | null>{
  try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!response.ok) return null;
      const data = await response.json();

     return {
      name: data.name,
      types: data.types.map((t: any) => t.type.name),
      sprite: data.sprites.front_default
    };
  } catch {
      return null;
  }
}

function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

const typeColors: { [key: string]: string } = {
  fire: "#F08030", water: "#6890F0", grass: "#78C850", electric: "#F8D030",
  ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
  flying: "#A890F0", psychic: "#F85888", bug: "#A8B820", rock: "#B8A038",
  ghost: "#705898", dragon: "#7038F8", dark: "#705848", steel: "#B8B8D0",
  fairy: "#EE99AC", normal: "#A8A878"
};

function RandomPokemon() {
  const [pokemon, setPokemon] = useState<PokeData | null>(null);

  function getRandomPokemon() {
    setPokemon(null);
    getRandPokemon().then(setPokemon);
  }

  // On mount, fetch the first Pokemon
  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <Box className="random-pokemon-root">
      <Box className="pokemon-image-wrapper">
        {pokemon && pokemon.sprite ? (
          <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-image" />
        ) : (
          <Box width={130} height={130} />
        )}
      </Box>
      <Paper className="display-box">
        {!pokemon ? (
          <CircularProgress />
        ) : (
          <Box textAlign="center">
            <Typography variant="h5" className="pokemon-name">
              {capitalize(pokemon.name)}
            </Typography>
            <Box className="types">
              {pokemon.types.map((type) => (
                <Chip
                  key={type}
                  className="type"
                  label={capitalize(type)}
                  style={{ background: typeColors[type] || "#aaa", color: "#fff" }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
      <Button variant="contained" onClick={getRandomPokemon} className="button">
        Random Pokémon
      </Button>
    </Box>
  );
}

export default RandomPokemon;