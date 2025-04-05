"use client";

import type React from "react";
import type { PokemonDetails } from "../types/pokemon";
import { formatPokemonName } from "../utils/api-functions";
import { getColorGradient } from "../utils/color-utils";
import { COLOURS_PER_TYPE } from "../constants/constants";

interface PokemonCardProps {
  pokemonDetails: PokemonDetails;
  toggleModal: (pokemon: PokemonDetails) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemonDetails,
  toggleModal,
}) => {
  const gradientMix = getColorGradient(pokemonDetails.types);

  return (
    <div
      className="pokemon-card rounded-lg overflow-hidden shadow-lg p-4 cursor-pointer transition-transform hover:scale-105"
      style={{
        background: `radial-gradient(circle at top, ${gradientMix[0]} 35%, ${gradientMix[1]}) 100%`,
      }}
      onClick={() => toggleModal(pokemonDetails)}
    >
      <div className="pokemon-id pokemon-text text-white font-bold text-lg">
        <h4>{"#" + pokemonDetails.id.toString().padStart(3, "0")}</h4>
      </div>
      <div className="sprite-container flex justify-center">
        <img
          src={
            pokemonDetails.sprites.other["official-artwork"].front_default ||
            pokemonDetails.sprites.front_default
          }
          alt={pokemonDetails.name}
          className="pokemon-sprite w-32 h-32 object-contain"
          loading="lazy"
        />
      </div>
      <h3 className="pokemon-text text-white font-bold text-xl text-center mt-2">
        {formatPokemonName(pokemonDetails.name)}
      </h3>
      <div className="pokemon-types flex justify-center gap-2 mt-2">
        {pokemonDetails.types.map((type) => (
          <span
            key={type.type.name}
            className="type-span px-2 py-1 rounded-full text-white text-xs font-semibold"
            style={{ backgroundColor: `${COLOURS_PER_TYPE[type.type.name]}` }}
          >
            {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
};
