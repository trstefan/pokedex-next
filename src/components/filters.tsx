"use client";

import type React from "react";
import { POKEMONS_REGIONS, TYPES, SORTING } from "../constants/constants";
import type { PokemonFilters } from "../types/pokemon";

interface FiltersProps {
  filters: PokemonFilters;
  updateFilters: (newFilters: Partial<PokemonFilters>) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, updateFilters }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Region
          </label>
          <select
            id="region"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.region}
            onChange={(e) => updateFilters({ region: e.target.value })}
          >
            {POKEMONS_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type
          </label>
          <select
            id="type"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.type}
            onChange={(e) => updateFilters({ type: e.target.value })}
          >
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sortBy"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sort By
          </label>
          <select
            id="sortBy"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
          >
            {SORTING.map((sort) => (
              <option key={sort} value={sort}>
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
