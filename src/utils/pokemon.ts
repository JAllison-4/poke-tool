export interface PokeData {
  name: string;
  types: string[];
  sprite: string;
}

export function capitalize(s: string): string {
  return s[0].toUpperCase() + s.slice(1);
}

export async function fetchPokemon(name: string): Promise<PokeData | null> {
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
