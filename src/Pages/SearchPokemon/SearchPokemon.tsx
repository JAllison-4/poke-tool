import React, { useState } from "react";
import {
  Autocomplete,
  Card,
  TextField,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import "./SearchPokemon.css";
import allPokemonNames from "../../Data/pokemon-names.json"; // Assuming this is a JSON file with all Pokémon names

type PokeData = {
  name: string;
  types: string[];
  sprite: string;
};

function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

const typeColors: { [key: string]: string } = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
};

async function fetchPokemon(name: string): Promise<PokeData | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) return null;
    const data = await response.json();
    return {
      name: data.name,
      types: data.types.map((t: any) => t.type.name),
      sprite: data.sprites.front_default,
    };
  } catch {
    return null;
  }
}

export default function PokemonSearch() {
  const [selected, setSelected] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<PokeData | null>(null);

  async function handleSelect(event: any, value: string | null) {
    setSelected(value);
    setPokemon(null);
    if (value) {
      const pokemon = await fetchPokemon(value.toLowerCase());
      setPokemon(pokemon);
    }
  }

  return (
    <Box className="search-pokemon-root">
      <Autocomplete
        options={allPokemonNames.map(capitalize)}
        value={selected ? capitalize(selected) : null}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Pokémon"
            variant="outlined"
            sx={{
              input: { color: "#ccc", background: "#353740" },
              label: { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset, &.Mui-focused fieldset": {
                  borderColor: "#888",
                },
              },
            }}
          />
        )}
        sx={{
          mt: 3,
          mb: 3,
          width: 260,
          mx: "auto",
          "& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator":
            { color: "#ef5350" },
          "& .MuiAutocomplete-paper": { backgroundColor: "#2b2c30" },
          "& .MuiAutocomplete-listbox": { backgroundColor: "#2b2c30" },
        }}
        autoHighlight
        autoSelect
        clearOnEscape
      />

      {pokemon && (
        <Card
          className="display-box"
          sx={{
            minHeight: 230,
            maxWidth: 320,
            mx: "auto",
          }}
        >
          {pokemon.sprite ? (
            <Box
              component="img"
              src={pokemon.sprite}
              alt={pokemon.name}
              className="pokemon-image"
              sx={{ mx: "auto", mt: 2, width: 115, height: 115 }}
            />
          ) : (
            <Box sx={{ width: 130, height: 130, mx: "auto", mt: 2 }} />
          )}
          <>
            <Typography variant="h4" component="h2" className="pokemon-name">
              {capitalize(pokemon.name)}
            </Typography>
            <Box className="types" sx={{ justifyContent: "center" }}>
              {pokemon.types.map((type) => (
                <Chip
                  key={type}
                  label={capitalize(type)}
                  className="type"
                  sx={{
                    background: typeColors[type] || "#aaa",
                    color: "#fff",
                    minWidth: 88,
                    justifyContent: "center",
                    mx: 0.5,
                  }}
                />
              ))}
            </Box>
          </>
        </Card>
      )}
    </Box>
  );
}
