import type {
  PokemonBasic,
  PokemonDetails,
  PokemonListResponse,
} from "../types/pokemon";

export const getPokemonList = async (url: string): Promise<PokemonBasic[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
  }

  const data: PokemonListResponse = await response.json();

  return data.results.map((pokemon) => ({
    ...pokemon,
    id: getPokemonIdFromUrl(pokemon.url),
  }));
};

export const getPokemonDetails = async (
  url: string
): Promise<PokemonDetails> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
  }

  return await response.json();
};

export const getPokemonIdFromUrl = (url: string): string => {
  const urlSegments = url.split("/");
  // Handle trailing slash
  const pokemonId = urlSegments.pop() || urlSegments.pop();
  return pokemonId || "";
};

type EvolutionNode = {
  species: { url: string };
  evolves_to: EvolutionNode[];
};

export const getPokemonEvolution = async (url: string): Promise<string[][]> => {
  const evolutions: string[][] = [];

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon evolution: ${response.status}`);
  }

  const evoData = await response.json();

  const searchEvolutionTree = (node: EvolutionNode, level: number): void => {
    if (!evolutions[level]) evolutions[level] = [];
    evolutions[level].push(getPokemonIdFromUrl(node.species.url));
    node.evolves_to.forEach((child) => searchEvolutionTree(child, level + 1));
  };

  searchEvolutionTree(evoData.chain, 0);

  return evolutions;
};

export const formatPokemonName = (name: string): string => {
  return name
    .toLowerCase()
    .split("-")
    .map((s) => {
      if (s === "m") return "♂";
      if (s === "f") return "♀";
      return s.charAt(0).toUpperCase() + s.substring(1);
    })
    .join(" ");
};

export const formatStatName = (name: string): string => {
  if (name === "hp") return "HP";

  return name
    .toLowerCase()
    .split("-")
    .map((s) => {
      if (s === "special") return "Sp";
      return s.charAt(0).toUpperCase() + s.substring(1);
    })
    .join(" ");
};
