export interface PokemonBasic {
  id: string;
  name: string;
  url: string;
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  species: PokemonSpecies;
  base_experience?: number;
  evolution_chain: {
    url: string;
  };
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
}

export interface PokemonFilters {
  region: string;
  type: string;
  sortBy: string;
  searchedPokemon: string;
}

export interface RegionInfo {
  start: number;
  limit: number;
}

export interface RegionsInfo {
  [key: string]: RegionInfo;
}
