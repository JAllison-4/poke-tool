import React from "react";
import { Card, Typography, Box, Chip } from "@mui/material";
import { PokeData, capitalize } from "../utils/pokemon";
import "./PokemonCard.css";

const typeColors: { [key: string]: string } = {
  fire: "#F08030", water: "#6890F0", grass: "#78C850", electric: "#F8D030",
  ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
  flying: "#A890F0", psychic: "#F85888", bug: "#A8B820", rock: "#B8A038",
  ghost: "#705898", dragon: "#7038F8", dark: "#705848", steel: "#B8B8D0",
  fairy: "#EE99AC", normal: "#A8A878"
};

interface PokemonCardProps {
  pokemon: PokeData;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card
      className="display-box"
      sx={{ minHeight: 230, maxWidth: 320, mx: "auto" }}
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
  );
}
