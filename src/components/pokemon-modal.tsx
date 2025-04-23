"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PokemonDetails } from "../types/pokemon";
import {
  formatPokemonName,
  formatStatName,
  getPokemonDetails,
  getPokemonEvolution,
} from "../utils/api-functions";
import { COLOURS_PER_TYPE, COLOURS_PER_STAT } from "../constants/constants";
import { getColorGradient } from "../utils/color-utils";
import {
  fadeInAnimation,
  scaleUpAnimation,
  slideUpAnimation,
  staggerChildren,
  pulseAnimation,
} from "../utils/animations-utils";
import { X, ChevronRight, Info, BarChart3, GitBranch } from "lucide-react";

interface PokemonModalProps {
  toggleModal: () => void;
  detailPokemon: PokemonDetails;
  allPokemonDetails: PokemonDetails[];
}

interface SpeciesInfo {
  genera: { genus: string; language: { name: string } }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
  evolution_chain: {
    url: string;
  };
  base_happiness?: number;
  capture_rate?: number;
  growth_rate?: { name: string };
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  toggleModal,
  detailPokemon,
  allPokemonDetails,
}) => {
  const modalBackground = useRef<HTMLDivElement>(null);
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetails>(detailPokemon);
  const [speciesInfo, setSpeciesInfo] = useState<SpeciesInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [evolution, setEvolution] = useState<string[][]>([]);
  const [activeTab, setActiveTab] = useState<"about" | "stats" | "evolution">(
    "about"
  );
  const [isChangingPokemon, setIsChangingPokemon] = useState(false);

  useEffect(() => {
    const getSpeciesInfo = async () => {
      try {
        setLoading(true);
        const speciesData = await getPokemonDetails(pokemonDetails.species.url);

        // Type guard to ensure speciesData is of type SpeciesInfo
        if (isSpeciesInfo(speciesData)) {
          setSpeciesInfo(speciesData);

          const evolutionData = await getPokemonEvolution(
            speciesData.evolution_chain.url
          );
          setEvolution(evolutionData);
        } else {
          console.error(
            "Received data is not of type SpeciesInfo:",
            speciesData
          );
        }
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      } finally {
        setLoading(false);
        setIsChangingPokemon(false);
      }
    };

    if (pokemonDetails != null) {
      getSpeciesInfo();
    }
  }, [pokemonDetails]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalBackground.current) {
      toggleModal();
    }
  };

  const changePokemon = (pokemonId: string) => {
    const id = Number.parseInt(pokemonId);
    if (allPokemonDetails[id - 1]) {
      setIsChangingPokemon(true);
      setTimeout(() => {
        setPokemonDetails(allPokemonDetails[id - 1]);
      }, 300);
    }
  };

  const typeColorGradient = getColorGradient(pokemonDetails.types);
  const mainType = pokemonDetails.types[0]?.type.name || "normal";

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const getFlavorText = () => {
    if (!speciesInfo?.flavor_text_entries) return "No description available.";

    const englishEntries = speciesInfo.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    );

    return (
      englishEntries[englishEntries.length - 1]?.flavor_text
        .replace(/\f/g, " ")
        .replace(/\n/g, " ")
        .replace(/POKéMON/g, "Pokémon") || "No description available."
    );
  };

  // Type guard function
  const isSpeciesInfo = (data: unknown): data is SpeciesInfo => {
    return (
      typeof data === "object" &&
      data !== null &&
      Array.isArray((data as any).genera) &&
      Array.isArray((data as any).flavor_text_entries) &&
      typeof (data as any).evolution_chain === "object" &&
      typeof (data as any).evolution_chain.url === "string"
    );
  };

  const TabIcon = {
    about: Info,
    stats: BarChart3,
    evolution: GitBranch,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-start md:items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
        ref={modalBackground}
        onClick={handleBackgroundClick}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInAnimation}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative my-4 md:my-0"
          style={{
            background: `radial-gradient(circle at top, ${typeColorGradient[0]} 35%, ${typeColorGradient[1]}) 100%`,
          }}
          variants={scaleUpAnimation}
        >
          {/* Close button */}
          <motion.button
            onClick={toggleModal}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-opacity-30 text-white z-10 shadow-lg transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Close modal"
          >
            <X size={24} />
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 relative z-0 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
            {/* Left Panel */}
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              animate={isChangingPokemon ? "hidden" : "visible"}
              variants={slideUpAnimation}
            >
              <motion.h4
                className="text-white font-bold text-lg bg-black/20 px-4 py-1 rounded-full shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {"#" + pokemonDetails.id.toString().padStart(3, "0")}
              </motion.h4>

              <motion.div
                className="flex justify-center my-4 md:my-6 relative"
                animate={isChangingPokemon ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full bg-white/20 backdrop-blur-sm"
                  animate={pulseAnimation}
                ></motion.div>
                <motion.img
                  src={
                    pokemonDetails.sprites.other["official-artwork"]
                      .front_default || pokemonDetails.sprites.front_default
                  }
                  alt={pokemonDetails.name}
                  className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain z-10 drop-shadow-2xl"
                  loading="lazy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1,
                  }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.1}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </motion.div>

              <motion.h3
                className="text-white font-bold text-2xl md:text-3xl mb-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {formatPokemonName(pokemonDetails.name)}
              </motion.h3>

              <motion.div
                className="text-white opacity-80 mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {loading ? (
                  <motion.div
                    className="h-4 w-32 bg-white bg-opacity-30 rounded-full mx-auto"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  ></motion.div>
                ) : (
                  speciesInfo?.genera?.find((g) => g.language.name === "en")
                    ?.genus || "Pokémon"
                )}
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6 px-2"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
              >
                {pokemonDetails.types.map((type) => (
                  <motion.span
                    key={type.type.name}
                    className="px-3 py-1 rounded-full text-white text-xs md:text-sm font-semibold shadow-md"
                    style={{
                      backgroundColor: COLOURS_PER_TYPE[type.type.name],
                    }}
                    variants={slideUpAnimation}
                    whileHover={{
                      scale: 1.1,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    {type.type.name.charAt(0).toUpperCase() +
                      type.type.name.slice(1)}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4 md:gap-8 w-full"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                  variants={slideUpAnimation}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <h5 className="text-white font-semibold mb-1">Height</h5>
                  <span className="text-white text-lg">
                    {pokemonDetails.height / 10}m
                  </span>
                </motion.div>
                <motion.div
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                  variants={slideUpAnimation}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <h5 className="text-white font-semibold mb-1">Weight</h5>
                  <span className="text-white text-lg">
                    {pokemonDetails.weight / 10}kg
                  </span>
                </motion.div>
              </motion.div>

              {/* Mobile Tabs - Only visible on small screens */}
              <motion.div
                className="flex mt-6 mb-4 bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-md md:hidden w-full max-w-xs mx-auto"
                variants={fadeInAnimation}
              >
                {(["about", "stats", "evolution"] as const).map((tab) => {
                  const Icon = TabIcon[tab];
                  return (
                    <motion.button
                      key={tab}
                      className={`flex-1 py-2 px-2 rounded-full text-white font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                        activeTab === tab
                          ? "bg-white/20 shadow-sm"
                          : "hover:bg-white/10"
                      }`}
                      onClick={() => setActiveTab(tab)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Show ${tab} tab`}
                    >
                      <Icon size={16} />
                      <span className="text-xs">
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
              className="flex flex-col"
              initial="hidden"
              animate={isChangingPokemon ? "hidden" : "visible"}
              variants={slideUpAnimation}
            >
              {/* Desktop Tabs - Only visible on medium screens and up */}
              <motion.div
                className="hidden md:flex mb-6 bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-md"
                variants={fadeInAnimation}
              >
                {(["about", "stats", "evolution"] as const).map((tab) => {
                  const Icon = TabIcon[tab];
                  return (
                    <motion.button
                      key={tab}
                      className={`flex-1 py-2 px-4 rounded-full text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        activeTab === tab
                          ? "bg-white/20 shadow-sm"
                          : "hover:bg-white/10"
                      }`}
                      onClick={() => setActiveTab(tab)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Show ${tab} tab`}
                    >
                      <Icon size={16} />
                      <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-y-auto max-h-[50vh] md:max-h-none"
                  >
                    <h4 className="text-white font-bold text-lg md:text-xl mb-2">
                      Description
                    </h4>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white shadow-lg mb-4 md:mb-6"
                      whileHover={{
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      {loading ? (
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className="h-4 bg-white/20 rounded-full"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                            ></motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="leading-relaxed text-sm md:text-base">
                          {getFlavorText()}
                        </p>
                      )}
                    </motion.div>

                    <h4 className="text-white font-bold text-lg md:text-xl mb-2">
                      Profile
                    </h4>
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white shadow-lg"
                      whileHover={{
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <p className="text-white opacity-70 text-xs md:text-sm">
                            Base Experience
                          </p>
                          <p className="font-semibold text-sm md:text-base">
                            {pokemonDetails.base_experience || "Unknown"}
                          </p>
                        </div>
                        <div>
                          <p className="text-white opacity-70 text-xs md:text-sm">
                            Base Happiness
                          </p>
                          <p className="font-semibold text-sm md:text-base">
                            {speciesInfo?.base_happiness ?? "Unknown"}
                          </p>
                        </div>
                        <div>
                          <p className="text-white opacity-70 text-xs md:text-sm">
                            Capture Rate
                          </p>
                          <p className="font-semibold text-sm md:text-base">
                            {speciesInfo?.capture_rate ?? "Unknown"}
                          </p>
                        </div>
                        <div>
                          <p className="text-white opacity-70 text-xs md:text-sm">
                            Growth Rate
                          </p>
                          <p className="font-semibold text-sm md:text-base">
                            {speciesInfo?.growth_rate?.name?.replace(
                              "-",
                              " "
                            ) || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Stats Tab done */}

                {activeTab === "stats" && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-y-auto max-h-[50vh] md:max-h-none"
                  >
                    <h4 className="text-white font-bold text-lg md:text-xl mb-4">
                      Base Stats
                    </h4>
                    <motion.div
                      className="space-y-3 md:space-y-4"
                      variants={staggerChildren}
                      initial="hidden"
                      animate="visible"
                    >
                      {pokemonDetails.stats.map((stat, index) => (
                        <motion.div
                          key={stat.stat.name}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg"
                          variants={slideUpAnimation}
                          custom={index}
                          whileHover={{
                            y: -5,
                            boxShadow:
                              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          }}
                        >
                          <div className="flex justify-between mb-1 md:mb-2">
                            <h6 className="text-white font-semibold text-sm md:text-base">
                              {formatStatName(stat.stat.name)}
                            </h6>
                            <span className="text-white font-bold text-sm md:text-base">
                              {stat.base_stat}
                            </span>
                          </div>
                          <div className="bg-white/10 rounded-full h-2 md:h-3 w-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  COLOURS_PER_STAT[stat.stat.name] || "#ffffff",
                              }}
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.min(
                                  100,
                                  (stat.base_stat / 255) * 100
                                )}%`,
                              }}
                              transition={{
                                duration: 1,
                                delay: 0.1 * index,
                                ease: "easeOut",
                              }}
                            ></motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Evolution Tab */}

                {activeTab === "evolution" && (
                  <motion.div
                    key="evolution"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 overflow-y-auto max-h-[50vh] md:max-h-none px-4"
                  >
                    <h4 className="text-white font-bold text-lg md:text-xl mb-4 ">
                      Evolution Chain
                    </h4>
                    {loading ? (
                      <div className="flex justify-center items-center h-32 md:h-64">
                        <motion.div
                          className="w-12 h-12 md:w-16 md:h-16 border-4 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        ></motion.div>
                      </div>
                    ) : evolution.length === 0 ? (
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-white text-center shadow-lg">
                        <p>No evolution data available</p>
                      </div>
                    ) : (
                      <div className=" pb-2">
                        <motion.div
                          className="flex items-center justify-start md:justify-center "
                          variants={staggerChildren}
                          initial="hidden"
                          animate="visible"
                        >
                          {evolution.map((column, i) => (
                            <React.Fragment key={i}>
                              <motion.div
                                className={`grid  ${
                                  column.length > 1
                                    ? "grid-cols-2 md:grid-cols-3 gap-4 mt-3 items-center"
                                    : ""
                                } `}
                                variants={slideUpAnimation}
                              >
                                {column.map((pokemonId) => {
                                  const pokemon =
                                    allPokemonDetails[
                                      Number.parseInt(pokemonId) - 1
                                    ];
                                  const isCurrentPokemon =
                                    pokemon?.id === pokemonDetails.id;

                                  return pokemon ? (
                                    <motion.div
                                      key={pokemonId}
                                      className={`${
                                        isCurrentPokemon
                                          ? "bg-opacity-30"
                                          : "bg-opacity-10"
                                      } backdrop-blur-sm rounded-xl p-3 cursor-pointer transition-all duration-300 shadow-lg ${
                                        isCurrentPokemon
                                          ? "ring-2 ring-white"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        !isCurrentPokemon &&
                                        changePokemon(pokemonId)
                                      }
                                      whileHover={{
                                        scale: 1.05,
                                        boxShadow:
                                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                      }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <motion.div
                                        className="w-20 h-20 mx-auto relative"
                                        whileHover={{
                                          rotate: [0, -5, 5, -5, 0],
                                        }}
                                        transition={{ duration: 0.5 }}
                                      >
                                        {isCurrentPokemon && (
                                          <motion.div
                                            className="absolute inset-0 rounded-full"
                                            animate={pulseAnimation}
                                          ></motion.div>
                                        )}
                                        <img
                                          src={
                                            pokemon.sprites.other[
                                              "official-artwork"
                                            ].front_default ||
                                            pokemon.sprites.front_default ||
                                            "/placeholder.svg"
                                          }
                                          alt={pokemon.name}
                                          className="w-full h-full object-contain drop-shadow-md"
                                          loading="lazy"
                                        />
                                      </motion.div>
                                      <div className="text-center text-white mt-2">
                                        <p className="font-semibold text-sm">
                                          {formatPokemonName(pokemon.name)}
                                        </p>
                                        <p className="text-xs opacity-80">
                                          #
                                          {pokemon.id
                                            .toString()
                                            .padStart(3, "0")}
                                        </p>
                                      </div>
                                    </motion.div>
                                  ) : null;
                                })}
                              </motion.div>
                              {i < evolution.length - 1 && (
                                <motion.div
                                  className="text-white mx-1 md:mx-2"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.5 + i * 0.2 }}
                                >
                                  <ChevronRight
                                    size={20}
                                    className="md:w-6 md:h-6"
                                  />
                                </motion.div>
                              )}
                            </React.Fragment>
                          ))}
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
