
import React, { useEffect, useState } from "react";

type TypeMatchups = {
  doubleDamageFrom: string[];
  halfDamageFrom: string[];
  noDamageFrom: string[];
  doubleDamageTo: string[];
  halfDamageTo: string[];
  noDamageTo: string[];
};

type PokeData = {
  name: string;
  types: string[];
  matchups: TypeMatchups;
};

const RandomPokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokeData | null>(null);

  useEffect(() => {
    getRandPokemon().then(setPokemon);
  }, []);

  return (
    <div>
        <h3>Random Pokémon</h3>
        <p><b>Name:</b> {pokemon?.name}</p>
        <p><b>Types:</b> {pokemon?.types.join(", ")}</p>
        <p><b>Double Damage From:</b> {pokemon?.matchups.doubleDamageFrom.join(", ")}</p>
    </div>
  );
};

async function getRandPokemon(): Promise<PokeData | null>{
    try {
        const randomId = Math.floor(Math.random() * 151) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();

        const types = data.types.map((type: { type: { name: string } }) => type.type.name);
        const typeMatchups = await getTypeMatchups(types);

        const pokeData = {
            name: data.name,
            types,
            matchups: typeMatchups,
        };
        
        return pokeData;
    } catch (error) {
        return null;
    }
}

async function getTypeMatchups(types: string[]): Promise<TypeMatchups> {
  // Fetch all type data in parallel
  const results = await Promise.all(
    types.map(type =>
      fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => res.json())
    )
  );

  const doubleDamageFrom: string[] = [];
  const halfDamageFrom: string[] = [];
  const noDamageFrom: string[] = [];
  const doubleDamageTo: string[] = [];
  const halfDamageTo: string[] = [];
  const noDamageTo: string[] = [];

  results.forEach(data => {
    data.damage_relations.double_damage_from.forEach((t: any) => doubleDamageFrom.push(t.name));
    data.damage_relations.half_damage_from.forEach((t: any) => halfDamageFrom.push(t.name));
    data.damage_relations.no_damage_from.forEach((t: any) => noDamageFrom.push(t.name));
    data.damage_relations.double_damage_to.forEach((t: any) => doubleDamageTo.push(t.name));
    data.damage_relations.half_damage_to.forEach((t: any) => halfDamageTo.push(t.name));
    data.damage_relations.no_damage_to.forEach((t: any) => noDamageTo.push(t.name));
  });

  return {
    doubleDamageFrom,
    halfDamageFrom,
    noDamageFrom,
    doubleDamageTo,
    halfDamageTo,
    noDamageTo
  };
}

export default RandomPokemon;