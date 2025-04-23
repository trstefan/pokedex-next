"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonModal } from "@/components/pokemon-modal";
import { Filters } from "@/components/filters";
import type { PokemonDetails, PokemonFilters } from "@/types/pokemon";
import { REGIONS_INFO, POKEMONS_PER_LOAD } from "@/constants/constants";
import {
  getPokemonDetails,
  getPokemonList,
  formatPokemonName,
} from "@/utils/api-functions";
import { Search, Filter, X } from "lucide-react";
import Link from "next/link";

export default function ExplorerPage() {
  const initialFilters: PokemonFilters = {
    region: "all",
    type: "all",
    sortBy: "id",
    searchedPokemon: "",
  };

  const [allPokemonDetails, setAllPokemonDetails] = useState<PokemonDetails[]>(
    []
  );
  const [displayedPokemons, setDisplayedPokemons] = useState<PokemonDetails[]>(
    []
  );
  const [numPokemon, setNumPokemon] = useState(POKEMONS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<PokemonFilters>(initialFilters);
  const [showPokemonModal, setShowPokemonModal] = useState(false);
  const [detailPokemon, setDetailPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

  // Fetching all Pokemon without any filters set
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokesList = await getPokemonList(
          "https://pokeapi.co/api/v2/pokemon?limit=1302"
        );
        const allResponses = await Promise.all(
          pokesList.map((pokemon) => getPokemonDetails(pokemon.url))
        );
        setAllPokemonDetails(allResponses);
        setDisplayedPokemons(allResponses);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Apply filters
  useEffect(() => {
    if (allPokemonDetails.length === 0) return;

    const start = REGIONS_INFO[filters.region].start;
    const limit = REGIONS_INFO[filters.region].limit;

    const filteredPokemon = allPokemonDetails
      .slice(start, start + limit)
      .filter((pokemon) => {
        return (
          pokemon &&
          (filters.type === "all" ||
            pokemon.types.map((type) => type.type.name).includes(filters.type))
        );
      })
      .filter((pokemon) => {
        return (
          pokemon &&
          formatPokemonName(pokemon.species.name)
            .toLowerCase()
            .includes(filters.searchedPokemon.toLowerCase())
        );
      });

    // Sort
    if (filters.sortBy === "name") {
      filteredPokemon.sort((p1, p2) =>
        p1.species.name.localeCompare(p2.species.name)
      );
    }

    setDisplayedPokemons(filteredPokemon);
    setNumPokemon(POKEMONS_PER_LOAD);
  }, [allPokemonDetails, filters]);

  const updateFilters = (newFilters: Partial<PokemonFilters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const loadMorePokemon = () => {
    setNumPokemon(numPokemon + POKEMONS_PER_LOAD);
  };

  const toggleModal = (pokemonDetails?: PokemonDetails) => {
    if (pokemonDetails) {
      setDetailPokemon(pokemonDetails);
      setShowPokemonModal(true);
    } else {
      setDetailPokemon(null);
      setShowPokemonModal(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.header
        className="text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Link href="/">
          <h1 className="text-4xl font-bold mb-2">PokéDext</h1>{" "}
        </Link>
        <p className="text-xl italic">Gotta Catch `&apos;`Em All!</p>
      </motion.header>

      <div className="mb-6 flex items-center justify-between  flex-wrap gap-4">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Search Pokémon..."
            value={filters.searchedPokemon}
            onChange={(e) => updateFilters({ searchedPokemon: e.target.value })}
          />
        </div>

        <div className="flex space-x-2">
          {/* Clear filters button - only show when filters are not at initial state */}
          {(filters.region !== initialFilters.region ||
            filters.type !== initialFilters.type ||
            filters.sortBy !== initialFilters.sortBy ||
            filters.searchedPokemon !== initialFilters.searchedPokemon) && (
            <motion.button
              className="py-2 px-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
              onClick={clearFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              Clear filters
            </motion.button>
          )}

          <motion.button
            className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showFilters ? <X size={24} /> : <Filter size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Filters filters={filters} updateFilters={updateFilters} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pokemon Grid Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          ></motion.div>
          <motion.h1
            className="mt-4 text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Pokémon...
          </motion.h1>
        </div>
      ) : (
        <>
          {displayedPokemons.length === 0 ? (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold">No Pokémon found! :(</h3>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
                hidden: {},
              }}
            >
              {displayedPokemons.slice(0, numPokemon).map((pokemon) => (
                <motion.div
                  key={pokemon.name}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 50 },
                  }}
                >
                  <PokemonCard
                    pokemonDetails={pokemon}
                    toggleModal={toggleModal}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {numPokemon < displayedPokemons.length && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={loadMorePokemon}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Load more
              </motion.button>
            </motion.div>
          )}
        </>
      )}

      <AnimatePresence>
        {showPokemonModal && detailPokemon && (
          <PokemonModal
            toggleModal={() => toggleModal()}
            detailPokemon={detailPokemon}
            allPokemonDetails={allPokemonDetails}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
