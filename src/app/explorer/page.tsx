"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonModal } from "@/components/pokemon-modal";
import { Filters } from "@/components/filters";
import { Header } from "@/components/header";
import type { PokemonDetails, PokemonFilters } from "@/types/pokemon";
import {
  REGIONS_INFO,
  POKEMONS_PER_LOAD,
  COLOURS_PER_TYPE,
} from "@/constants/constants";
import {
  getPokemonDetails,
  getPokemonList,
  formatPokemonName,
} from "@/utils/api-functions";
import { Search, Filter, X, ArrowUp, Sparkles } from "lucide-react";
import { Pokeball } from "@/components/pokeball";

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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [randomType, setRandomType] = useState<string>("normal");

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Change random type every 5 seconds for visual effects
  useEffect(() => {
    const types = Object.keys(COLOURS_PER_TYPE);
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * types.length);
      setRandomType(types[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {
      setShowScrollTop(y > 500);
    });

    return () => unsubscribe();
  }, [scrollY]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 pt-20">
      <Header activePage="explorer" />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${COLOURS_PER_TYPE[randomType]} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${COLOURS_PER_TYPE[randomType]} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Explore Pokémon
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through the complete Pokédex, filter by region or type, and
            discover detailed information about your favorite Pokémon.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              placeholder="Search Pokémon by name..."
              value={filters.searchedPokemon}
              onChange={(e) =>
                updateFilters({ searchedPokemon: e.target.value })
              }
            />
          </div>

          <div className="flex space-x-2 w-full md:w-auto justify-end">
            {/* Clear filters button - only show when filters are not at initial state */}
            {(filters.region !== initialFilters.region ||
              filters.type !== initialFilters.type ||
              filters.sortBy !== initialFilters.sortBy ||
              filters.searchedPokemon !== initialFilters.searchedPokemon) && (
              <motion.button
                className="py-2 px-4 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition-all flex items-center gap-2"
                onClick={clearFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <X size={18} />
                <span className="hidden sm:inline">Clear filters</span>
              </motion.button>
            )}

            <motion.button
              className="py-2 px-4 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-all flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showFilters ? <X size={18} /> : <Filter size={18} />}
              <span className="hidden sm:inline">
                {showFilters ? "Hide filters" : "Show filters"}
              </span>
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
              className="overflow-hidden mb-8"
            >
              <Filters filters={filters} updateFilters={updateFilters} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pokemon Grid Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] py-16">
            <motion.div
              className="relative w-24 h-24"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Pokeball size={96} color="#E53935" />
            </motion.div>
            <motion.h1
              className="mt-6 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
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
                className="text-center mt-16 py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block mb-4"
                >
                  <Sparkles size={48} className="text-gray-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No Pokémon found!
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search term
                </p>
              </motion.div>
            ) : (
              <>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                  <p className="text-gray-600 text-sm">
                    Showing{" "}
                    <span className="font-semibold">
                      {Math.min(numPokemon, displayedPokemons.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                      {displayedPokemons.length}
                    </span>{" "}
                    Pokémon
                    {filters.region !== "all" && (
                      <span>
                        {" "}
                        from{" "}
                        <span className="font-semibold capitalize">
                          {filters.region}
                        </span>{" "}
                        region
                      </span>
                    )}
                    {filters.type !== "all" && (
                      <span>
                        {" "}
                        of{" "}
                        <span className="font-semibold capitalize">
                          {filters.type}
                        </span>{" "}
                        type
                      </span>
                    )}
                  </p>
                </div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
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
                        hidden: { opacity: 0, y: 30 },
                      }}
                      whileHover={{ y: -5 }}
                    >
                      <PokemonCard
                        pokemonDetails={pokemon}
                        toggleModal={toggleModal}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}

            {numPokemon < displayedPokemons.length && (
              <motion.div
                className="text-center mt-12 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={loadMorePokemon}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg flex items-center gap-2 mx-auto"
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Load more Pokémon</span>
                </motion.button>
              </motion.div>
            )}
          </>
        )}

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-6 right-6 p-3 bg-white rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all z-20"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPokemonModal && detailPokemon && (
          <PokemonModal
            toggleModal={() => toggleModal()}
            detailPokemon={detailPokemon}
            allPokemonDetails={allPokemonDetails}
          />
        )}
      </AnimatePresence>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12 font-semibold">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p> {new Date().getFullYear()} &copy; Stefan Traciu</p>
          <p className="mt-2">
            Made with <span className="text-red-500">❤</span> for Pokémon fans
            everywhere
          </p>
        </div>
      </footer>
    </div>
  );
}
