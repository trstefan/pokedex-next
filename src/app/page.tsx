"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Search,
  Zap,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const features = [
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: "Advanced Search",
      description:
        "Find any Pokémon instantly with our powerful search capabilities.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Detailed Stats",
      description:
        "Explore comprehensive stats, abilities, and evolution chains.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Team Building",
      description: "Create and analyze your perfect Pokémon team composition.",
    },
  ];

  const popularPokemon = [
    { id: 25, name: "Pikachu" },
    { id: 6, name: "Charizard" },
    { id: 150, name: "Mewtwo" },
    { id: 149, name: "Dragonite" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 py-20 md:py-32">
        <div className="absolute inset-0  opacity-10"></div>

        {/* Floating Pokeballs */}

        <div className="container relative px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-6xl/none">
                  Your Ultimate Pokémon Companion
                </h1>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="max-w-[600px] text-white/90 md:text-xl"
              >
                Explore the world of Pokémon with our comprehensive Pokédex app.
                Detailed information, stats, and more for every Pokémon at your
                fingertips.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/explorer">
                  <Button
                    size="lg"
                    className="group bg-white text-primary hover:bg-white/90 font-bold text-lg px-8"
                  >
                    Explore Now
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto aspect-square max-w-[450px] lg:mx-0"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-red-500 blur-3xl opacity-30"></div>
              <div className="relative h-full w-full rounded-3xl bg-white/10 backdrop-blur-sm p-6 shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute top-4 left-4 right-4 h-8 bg-white/10 rounded-full"></div>
                <div className="absolute top-16 left-4 right-4 bottom-4 bg-white/5 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {popularPokemon.map((pokemon) => (
                      <motion.div
                        key={pokemon.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/10 rounded-xl p-3 flex flex-col items-center"
                      >
                        <div className="h-16 w-16 bg-white/20 rounded-full mb-2 overflow-hidden">
                          <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            alt={pokemon.name}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-white text-sm font-medium">
                          {pokemon.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Everything you need to become a Pokémon master, all in one place.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: 0.1,
          }}
        ></div>
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur-xl opacity-30"></div>
                <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl border border-border">
                  <div className="p-1 bg-gradient-to-r from-primary to-primary/50">
                    <div className="h-8 bg-card rounded-t-xl flex items-center px-4">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="h-10 bg-muted rounded-lg w-3/4"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-muted rounded-lg"></div>
                        <div className="h-24 bg-muted rounded-lg"></div>
                        <div className="h-24 bg-muted rounded-lg"></div>
                        <div className="h-24 bg-muted rounded-lg"></div>
                      </div>
                      <div className="h-10 bg-primary/20 rounded-lg w-1/2 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Discover All 898+ Pokémon Species
              </h2>
              <p className="text-muted-foreground text-lg">
                From the original 151 to the latest generation, our Pokédex has
                detailed information on every Pokémon ever created.
              </p>
              <ul className="space-y-4">
                {[
                  "Complete evolution chains",
                  "Abilities, moves, and stats",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="mr-3 rounded-full bg-primary/10 p-1">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Link href="/explorer">
                <Button className="mt-4 group">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { number: "898+", label: "Pokémon Species" },
              { number: "18", label: "Pokémon Types" },
              { number: "8", label: "Generations" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <div className="w-6 h-6 rounded-full bg-primary"></div>
              </div>
              <span className="font-bold text-lg">Pokédext</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Stefan Traciu. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
