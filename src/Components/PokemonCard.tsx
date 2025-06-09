import React from "react";
import { Card, Typography, Box, Chip, IconButton } from "@mui/material";
import { PokeData, capitalize } from "../utils/pokemon";
import { typeColors } from "../utils/typeChart";
import "./PokemonCard.css";

interface PokemonCardProps {
  pokemon: PokeData;
  small?: boolean;
  onRemove?: () => void;
}

export default function PokemonCard({ pokemon, small = false, onRemove }: PokemonCardProps) {
  const imgSize = small ? 72 : 115;
  const cardWidth = small ? 180 : 320;
  const nameVariant = small ? "h6" : "h4";
  return (
    <Card
      className={`display-box${small ? " compact" : ""}`}
      sx={{ minHeight: small ? 180 : 230, maxWidth: cardWidth, mx: "auto", p: small ? 1 : 2 }}
    >
      {onRemove && (
        <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
          <IconButton
            size="small"
            onClick={onRemove}
            className="remove-button"
          >
            ✕
          </IconButton>
        </Box>
      )}
      {pokemon.sprite ? (
        <Box
          component="img"
          src={pokemon.sprite}
          alt={pokemon.name}
          className="pokemon-image"
          sx={{ mx: "auto", mt: 2, width: imgSize, height: imgSize }}
        />
      ) : (
        <Box sx={{ width: imgSize, height: imgSize, mx: "auto", mt: 2 }} />
      )}
      <>
        <Typography variant={nameVariant} component="h2" className="pokemon-name">
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
                minWidth: small ? 64 : 88,
                justifyContent: "center",
                fontSize: small ? "0.75em" : undefined,
                mx: 0.5,
              }}
            />
          ))}
        </Box>
      </>
    </Card>
  );
}
