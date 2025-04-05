import type { PokemonType } from "../types/pokemon";
import {
  COLOURS_PER_TYPE,
  COLOURS_SECONDARY_TYPE,
} from "../constants/constants";

export const getColorGradient = (
  typesArray: PokemonType[]
): [string, string] => {
  if (typesArray.length === 1) {
    const typeName = typesArray[0].type.name;
    return [
      COLOURS_PER_TYPE[typeName] || "#A8A77A",
      COLOURS_SECONDARY_TYPE[typeName] || "#C2C1A1",
    ];
  } else {
    return [
      COLOURS_PER_TYPE[typesArray[0].type.name] || "#A8A77A",
      COLOURS_PER_TYPE[typesArray[1].type.name] || "#A8A77A",
    ];
  }
};
