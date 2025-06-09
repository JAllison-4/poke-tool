import React, { useState } from "react";
import { Box } from "@mui/material";
import "./SearchPokemon.css";
import allPokemonNames from "../../Data/pokemon-names.json";
import PokemonCard from "../../Components/PokemonCard";
import SearchBox from "../../Components/SearchBox";
import { fetchPokemon, capitalize, PokeData } from "../../utils/pokemon";

export default function PokemonSearch() {
  const [selected, setSelected] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<PokeData | null>(null);

  async function handleSelect(value: string | null) {
    setSelected(value);
    setPokemon(null);
    if (value) {
      const pokemon = await fetchPokemon(value.toLowerCase());
      setPokemon(pokemon);
    }
  }

  return (
    <Box className="search-pokemon-root">
      <SearchBox
        options={allPokemonNames.map(capitalize)}
        value={selected ? capitalize(selected) : null}
        onChange={handleSelect}
        label="Search Pokémon"
        autoHighlight
        autoSelect
        clearOnEscape
      />

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </Box>
  );
}
