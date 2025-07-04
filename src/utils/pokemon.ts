export interface PokeData {
  name: string;
  types: string[];
  sprite: string;
  cry?: string;
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
      cry: data.cries?.latest,
    };
  } catch {
    return null;
  }
}

export async function fetchRandomPokemon(): Promise<PokeData | null> {
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=0');
  const data = await resp.json();
  const count = data.count;
  const id = Math.floor(Math.random() * count) + 1;
  return fetchPokemon(String(id));
}
