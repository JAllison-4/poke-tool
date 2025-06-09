import React, { useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import "./SearchPokemon.css";
import allPokemonNames from "../../Data/pokemon-names.json";
import PokemonCard from "../../Components/PokemonCard";
import { fetchPokemon, capitalize, PokeData } from "../../utils/pokemon";

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

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </Box>
  );
}
