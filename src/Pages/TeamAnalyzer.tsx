import React, { useState, useMemo } from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import SearchBox from "../Components/SearchBox";
import PokemonCard from "../Components/PokemonCard";
import allPokemonNames from "../Data/pokemon-names.json";
import { fetchPokemon, capitalize, PokeData } from "../utils/pokemon";
import {
  typeWeaknesses,
  typeResistances,
  typeImmunities,
  typeColors,
} from "../utils/typeChart";

export default function TeamAnalyzer() {
  const [selected, setSelected] = useState<string | null>(null);
  const [team, setTeam] = useState<PokeData[]>([]);

  const weaknesses = useMemo(() => computeTeamWeaknesses(team), [team]);

  async function addPokemon() {
    if (!selected || team.length >= 6) return;
    const data = await fetchPokemon(selected.toLowerCase());
    if (data) {
      setTeam([...team, data]);
      setSelected(null);
    }
  }

  function removePokemon(name: string) {
    setTeam(team.filter((p) => p.name !== name));
  }

  function computeTeamWeaknesses(team: PokeData[]): string[] {
    const weak = new Set<string>();
    const resist = new Set<string>();
    const immune = new Set<string>();

    team.forEach((pokemon: PokeData) => {
      pokemon.types.forEach((t) => {
        (typeWeaknesses[t] || []).forEach((w) => weak.add(w));
        (typeResistances[t] || []).forEach((r) => resist.add(r));
        (typeImmunities[t] || []).forEach((i) => immune.add(i));
      });
    });

    return Array.from(weak).filter(
      (t) => !resist.has(t) && !immune.has(t)
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center", mt: 3 }}>
      <SearchBox
        options={allPokemonNames.map(capitalize)}
        value={selected ? capitalize(selected) : null}
        onChange={setSelected}
        label="Add Pokémon"
      />
      <Button
        onClick={addPokemon}
        disabled={!selected || team.length >= 6}
        variant="contained"
        sx={{ ml: 1, mt: 2 }}
      >
        Add to Team
      </Button>
      <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {team.map((pokemon: PokeData) => (
          <Box key={pokemon.name} sx={{ textAlign: "center" }}>
            <PokemonCard pokemon={pokemon} small onRemove={() => removePokemon(pokemon.name)}/>
          </Box>
        ))}
      </Box>

      {team.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Team Weaknesses
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
            {weaknesses.map((type) => (
              <Chip
                key={type}
                label={capitalize(type)}
                sx={{ background: typeColors[type] || "#777", color: "#fff" }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}