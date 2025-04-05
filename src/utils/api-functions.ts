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

  return data.results.map((pokemon) => {
    const { id, ...rest } = pokemon;
    return { id: getPokemonIdFromUrl(pokemon.url), ...rest };
  });
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
  // Handle trailing backslash
  const pokemonId = urlSegments.pop() || urlSegments.pop();
  return pokemonId || "";
};

export const getPokemonEvolution = async (url: string): Promise<string[][]> => {
  const evolutions: string[][] = [];

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon evolution: ${response.status}`);
  }

  const evoData = await response.json();

  // BFS of evolution tree
  const searchEvolutionTree = (node: any, level: number): void => {
    if (evolutions[level] === undefined) evolutions[level] = [];
    evolutions[level].push(getPokemonIdFromUrl(node.species.url));
    node.evolves_to.forEach((child: any) =>
      searchEvolutionTree(child, level + 1)
    );
  };

  searchEvolutionTree(evoData.chain, 0);

  return evolutions;
};

export const formatPokemonName = (name: string): string => {
  // Capitalize each word and change gender letters to the appropriate symbol
  return name
    .toLowerCase()
    .split("-")
    .map((s) => {
      if (s === "m") {
        return "♂";
      } else if (s === "f") {
        return "♀";
      }
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
