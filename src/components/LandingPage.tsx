import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useInView, 
  useScroll, 
  useTransform, 
  useSpring,
  AnimatePresence 
} from "framer-motion";
import { ArrowRight, Search, Zap, Shield, Star, Menu, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import Link from "next/link";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full p-1.5 shadow-lg">
            <div className="w-5 h-5 rounded-full border-[3px] border-white bg-transparent" />
          </div>
          <span className={cn(
            "text-2xl font-black tracking-tighter", 
            isScrolled ? "text-gray-900" : "text-white"
          )}>
            Poké<span className="text-pink-500">Dex</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="">
        <Link href="/explorer">
          <Button 
            className={cn(
              "rounded-full font-bold transition-all hover:scale-105 shadow-md hover:cursor-pointer",
              isScrolled 
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90" 
                : "bg-white text-indigo-600 hover:bg-gray-100"
            )}
          >
            Get Started
          </Button>
          </Link>
        </div>

             </div>

      </nav>
  );
};

const AnimatedCounter = ({ value, label, colorClass }: { value: number; label: string; colorClass: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, { bounce: 0, duration: 2500 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="text-center group cursor-default p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <motion.div 
        className={cn("text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br", colorClass)}
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {displayValue}+
      </motion.div>
      <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">
        {label}
      </div>
    </div>
  );
};

const PokemonMarquee = () => {
  const ids = [1, 4, 7, 25, 94, 133, 143, 149, 150, 151, 248, 384, 448, 700];
  const doubledIds = [...ids, ...ids, ...ids]; // Triple for seamless loop

  return (
    <div className="w-full overflow-hidden bg-white py-12 border-b border-gray-100 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none"></div>
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-yellow-400 w-5 h-5 animate-pulse" />
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
            Catch Your Favorites
          </p>
          <Sparkles className="text-yellow-400 w-5 h-5 animate-pulse" />
        </div>
      </div>
      <motion.div 
        className="flex gap-16 w-max"
        animate={{ x: ["0%", "-33%"] }}
        transition={{ 
          ease: "linear", 
          duration: 40, 
          repeat: Infinity 
        }}
      >
        {doubledIds.map((id, index) => (
          <div key={`${id}-${index}`} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={`Pokemon ${id}`}
              className="w-24 h-24 object-contain drop-shadow-md relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function LandingPage() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  // Parallax effects
  const heroTextY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroImageY = useTransform(scrollY, [0, 500], [0, -100]);
  const rotatePokeball = useTransform(scrollY, [0, 1000], [0, 360]);

  const features = [
    {
      icon: <Search className="h-6 w-6 text-indigo-600" />,
      theme: "indigo",
      title: "Smart Search",
      description: "Find any Pokémon instantly by name, type, ability, or region with our blazing fast search.",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      hoverBorder: "hover:border-indigo-300",
      iconBg: "bg-indigo-100"
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      theme: "yellow",
      title: "Battle Stats",
      description: "Analyze base stats, type effectiveness, and move sets to build the perfect team.",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      hoverBorder: "hover:border-yellow-300",
      iconBg: "bg-yellow-100"
    },
    {
      icon: <Shield className="h-6 w-6 text-teal-600" />,
      theme: "teal",
      title: "Evolution Data",
      description: "View complete evolution chains, including special conditions and mega evolutions.",
      bg: "bg-teal-50",
      border: "border-teal-100",
      hoverBorder: "hover:border-teal-300",
      iconBg: "bg-teal-100"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[105vh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"
        style={{ backgroundSize: '200% 200%' }}
      >
        {/* Animated Background Elements (Gradient Blobs) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large subtle blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400 blur-[120px] opacity-40 animate-blob mix-blend-overlay" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-400 blur-[120px] opacity-40 animate-blob mix-blend-overlay" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-purple-400 blur-[120px] opacity-40 animate-blob mix-blend-overlay" style={{ animationDelay: '4s' }} />

          {/* Rotating Giant Pokeball Watermark */}
          <motion.div 
            style={{ rotate: rotatePokeball, opacity: 0.1 }}
            className="absolute -right-20 top-1/4 w-[600px] h-[600px] md:w-[800px] md:h-[800px] text-white mix-blend-overlay"
          >
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M5,50 L95,50" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="50" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </motion.div>
          
          {/* Floating Color Orbs (Smaller, sharper) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full blur-2xl mix-blend-overlay",
                i % 3 === 0 ? "bg-yellow-300/30" : i % 3 === 1 ? "bg-blue-300/30" : "bg-pink-300/30"
              )}
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * -100],
                x: [null, (Math.random() - 0.5) * 50],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              style={{ y: heroTextY }}
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm font-bold text-white w-fit border border-white/20 shadow-lg"
              >
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                </span>
                Live Pokedex Database
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05] drop-shadow-sm">
                Your Ultimate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 drop-shadow-sm">Pokémon</span>{" "}
                Journey
              </h1>

              <p className="max-w-[600px] text-indigo-100 text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm">
                Explore comprehensive stats, evolution chains, and abilities for over 1000+ species. 
                Built for trainers, by trainers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/explorer">
                <Button
                  className="h-auto bg-white text-indigo-600 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-bold group border border-indigo-100"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
               </Link>
              </div>
            </motion.div>

            {/* Hero Images */}
            <motion.div
              style={{ y: heroImageY }}
              className="relative hidden lg:block h-[600px]"
            >
              {/* Main Charizard */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute right-0 top-10 z-20 w-[500px] h-[500px] animate-float"
              >
                 <motion.img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                  alt="Charizard"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
              </motion.div>

              {/* Background Pikachu */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute left-10 bottom-20 z-10 w-[250px] h-[250px] blur-[1px] animate-float"
                style={{ animationDelay: '1s' }}
              >
                <motion.img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                  alt="Pikachu"
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </motion.div>
              
              {/* Glass Card Floating */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ type: "spring", delay: 0.8 }}
                className="absolute -left-4 top-1/3 z-30 bg-white/20 backdrop-blur-xl border border-white/30 p-4 rounded-2xl shadow-xl max-w-[180px] animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-white text-sm">Fire Type</span>
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-3 h-3 shadow-sm"></span>
                </div>
                <div className="w-full bg-black/20 h-2 rounded-full mb-1">
                  <div className="bg-gradient-to-r from-green-400 to-green-300 h-2 rounded-full w-[80%]"></div>
                </div>
                <p className="text-xs text-white/90 font-mono">HP 78 / 100</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated Wave Divider */}
       
      </section>

      {/* Marquee Section */}
      <PokemonMarquee />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto font-medium">
              We've packed everything you need to become a Master. Fast, reliable, and beautifully designed.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={cn(
                  "group relative rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border",
                  feature.bg,
                  feature.border,
                  feature.hoverBorder
                )}
              >
                <div className={cn("mb-6 rounded-2xl p-4 w-fit shadow-md transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300 bg-white", feature.border)}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with CountUp */}
      <section id="stats" className="py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
        {/* Floating elements background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
           <div className="absolute top-10 left-[10%] w-20 h-20 bg-indigo-200 rounded-full blur-2xl"></div>
           <div className="absolute bottom-10 right-[10%] w-32 h-32 bg-pink-200 rounded-full blur-3xl"></div>
           <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-100 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Global Database</h2>
            <p className="text-muted-foreground">Constantly updated with the latest generation data</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { number: 1025, label: "Pokémon Species", color: "from-indigo-500 to-blue-600" },
              { number: 18, label: "Elemental Types", color: "from-pink-500 to-rose-600" },
              { number: 9, label: "Unique Regions", color: "from-purple-500 to-indigo-600" },
            ].map((stat, index) => (
              <AnimatedCounter key={index} value={stat.number} label={stat.label} colorClass={stat.color} />
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section
        id="showcase"
        className="py-32 relative overflow-hidden bg-gray-900 text-white"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-sm font-medium text-indigo-400">
                  <Shield className="w-4 h-4 mr-2" />
                  Detailed Analysis
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Every Detail, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">
                    Beautifully Presented
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Dive deep into the data. Our interface is designed to highlight what matters most during your gameplay. 
                  View resistances, weaknesses, and base stats at a glance.
                </p>
                
                <ul className="space-y-4">
                  {['High Resolution Sprites', 'Evolution Trees', 'Stats Levels'].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="flex items-center text-gray-300"
                    >
                      <div className="mr-3 p-1 rounded-full bg-green-500/20 text-green-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="order-1 lg:order-2 perspective-1000"
            >
              <div className="relative mx-auto max-w-[500px] group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-500 animate-gradient-x"></div>
                <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                  
                  {/* Holographic Shine Effect */}
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full animate-shine"></div>

                  {/* Mock Browser Header */}
                  <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-6 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 flex-1 h-6 bg-gray-900 rounded-full text-[10px] text-gray-500 flex items-center px-3">
                      pokedex-ultimate.app/mewtwo
                    </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">Mewtwo</h3>
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-xs font-bold uppercase border border-purple-500/30">Psychic</span>
                        </div>
                      </div>
                      <span className="text-4xl font-black text-gray-800">#150</span>
                    </div>
                    
                    <div className="flex justify-center my-8 relative">
                      <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-75 animate-pulse"></div>
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
                        alt="Mewtwo"
                        className="w-48 h-48 object-contain relative z-10"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                       {[{ l: "HP", v: 106, c: "bg-red-500" }, { l: "ATK", v: 110, c: "bg-orange-500" }, { l: "SPD", v: 130, c: "bg-blue-500" }].map((stat, i) => (
                         <div key={i} className="bg-gray-800 rounded-xl p-3 text-center border border-gray-700">
                           <div className="text-xs text-gray-400 mb-1">{stat.l}</div>
                           <div className="font-bold text-white mb-2">{stat.v}</div>
                           <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                             <div className={`h-full ${stat.c} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${(stat.v / 150) * 100}%` }}></div>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-md">
              Ready to Catch them All?
            </h2>
            <p className="text-white/90 text-xl font-medium max-w-2xl mx-auto drop-shadow-sm">
              Join thousands of trainers using our Pokédex to enhance their
              knowledge and master the art of battling.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/explorer">
              <Button
                className="h-auto bg-white text-indigo-600 hover:bg-gray-100 font-bold text-xl px-10 py-8 rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)] border-4 border-white/40 hover:cursor-pointer"
              >
                Launch Pokédex App
                <ArrowRight className="ml-2 h-6 w-6" />
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