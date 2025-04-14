"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, Zap, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const showcaseRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const showcaseInView = useInView(showcaseRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -150]);

  const features = [
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: "Search & Filter",
      description:
        "Find any Pokémon instantly with powerful search and filtering options.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Detailed Stats",
      description:
        "Explore comprehensive stats, abilities, and evolution chains.",
    },
  ];

  const popularPokemon = [
    { id: 25, name: "Pikachu" },
    { id: 6, name: "Charizard" },
    { id: 150, name: "Mewtwo" },
    { id: 149, name: "Dragonite" },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-red-500 to-orange-400"
      >
        <div className="container relative z-10 px-4 md:px-6 py-12 md:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col space-y-6"
            >
              <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white w-fit">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Discover all Pokémon in one place
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl/none">
                Your Ultimate <span className="text-yellow-300">Pokémon</span>{" "}
                Companion
              </h1>

              <p className="max-w-[600px] text-white/90 text-lg md:text-xl">
                Explore the world of Pokémon with our comprehensive Pokédex app.
                Detailed information, stats, and more for every Pokémon at your
                fingertips.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/explorer">
                  <Button
                    size="lg"
                    className="group bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer"
                  >
                    Explore Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="background"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Everything you need to become a Pokémon master, all in one place.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-card rounded-3xl p-8 shadow-lg border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="mb-5 rounded-full bg-primary/10 p-4 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { number: "898+", label: "Pokémon Species" },
              { number: "18", label: "Pokémon Types" },
              { number: "8", label: "Generations" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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

      {/* Showcase Section */}
      <section
        ref={showcaseRef}
        className="py-24 bg-muted/30 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0 opacity-10"
          style={{ y: parallaxY }}
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-repeat"></div>
        </motion.div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                showcaseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Complete Database
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Discover All 898+ Pokémon Species
                </h2>
                <p className="text-muted-foreground text-lg">
                  From the original 151 to the latest generation, our Pokédex
                  has detailed information on every Pokémon ever created.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                showcaseInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <div className="relative mx-auto max-w-[500px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-3xl blur-xl opacity-30"></div>
                <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl border border-border">
                  <div className="p-1 bg-gradient-to-r from-primary to-primary/50">
                    <div className="h-8 bg-card rounded-t-2xl flex items-center px-4">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="h-10 bg-muted rounded-lg w-3/4"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
                          <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                            alt="Pikachu"
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
                          <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                            alt="Charizard"
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
                          <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
                            alt="Mewtwo"
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
                          <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png"
                            alt="Dragonite"
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="h-10 bg-primary/20 rounded-lg w-1/2 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-24 bg-gradient-to-br from-primary/90 to-primary relative overflow-hidden"
      >
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Pokémon Journey?
            </h2>
            <p className="text-white/80 text-lg">
              Join thousands of trainers using our Pokédex to enhance their
              Pokémon knowledge and become true Pokémon masters.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pt-6"
            >
              <Link href="/explorer">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 rounded-full shadow-lg hover:cursor-pointer"
                >
                  Explore the Pokédex
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 font-semibold">
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
