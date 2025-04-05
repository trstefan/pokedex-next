export const POKEMONS_PER_LOAD = 20;

export const POKEMONS_REGIONS = [
  "all",
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
];

export const REGIONS_INFO: Record<string, { start: number; limit: number }> = {
  all: {
    start: 0,
    limit: 898,
  },
  kanto: {
    start: 0,
    limit: 151,
  },
  johto: {
    start: 151,
    limit: 100,
  },
  hoenn: {
    start: 251,
    limit: 135,
  },
  sinnoh: {
    start: 386,
    limit: 108,
  },
  unova: {
    start: 494,
    limit: 155,
  },
  kalos: {
    start: 649,
    limit: 72,
  },
  alola: {
    start: 721,
    limit: 88,
  },
  galar: {
    start: 809,
    limit: 96,
  },
  paldea: {
    start: 905,
    limit: 104,
  },
};

export const TYPES = [
  "all",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export const SORTING = ["id", "name"];

export const COLOURS_PER_TYPE: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const COLOURS_SECONDARY_TYPE: Record<string, string> = {
  normal: "#C2C1A1",
  fire: "#F3A66E",
  water: "#91b1f4",
  electric: "#f9de6b",
  grass: "#a1d781",
  ice: "#b5e4e2",
  fighting: "#d46c68",
  poison: "#be77bd",
  ground: "#ead293",
  flying: "#c2b0f6",
  psychic: "#fa88ab",
  bug: "#c0ce5e",
  rock: "#cbbd72",
  ghost: "#9d89b6",
  dragon: "#9a71fc",
  dark: "#9a897d",
  steel: "#ccccdc",
  fairy: "#e2a9c5",
};

export const COLOURS_PER_STAT: Record<string, string> = {
  hp: "#ff0100",
  attack: "#f08030",
  defense: "#f9d02f",
  "special-attack": "#6790f0",
  "special-defense": "#78c84f",
  speed: "#f95887",
};
