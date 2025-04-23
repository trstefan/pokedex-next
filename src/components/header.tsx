"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Pokeball } from "./pokeball";
import { Home, Search, Github } from "lucide-react";

interface HeaderProps {
  activePage?: "home" | "explorer";
}

export const Header: React.FC<HeaderProps> = ({ activePage = "explorer" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home, active: activePage === "home" },
    {
      name: "Explorer",
      href: "/explorer",
      icon: Search,
      active: activePage === "explorer",
    },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Pokeball size={40} color="#E53935" className="drop-shadow-md" />
          </motion.div>
          <div className="flex flex-col">
            <motion.h1
              className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600"
              whileHover={{ scale: 1.05 }}
            >
              PokéDext
            </motion.h1>
            <motion.span
              className="text-xs text-gray-500 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Gotta Catch &apos;Em All!
            </motion.span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={`flex items-center gap-1 px-3 py-2 rounded-full ${
                  item.active
                    ? "bg-gradient-to-r from-red-500 to-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={16} />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          ))}
          <motion.a
            href="https://github.com/trstefan/pokedex-next"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 text-gray-700"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            <span className="font-medium">GitHub</span>
          </motion.a>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="block md:hidden p-2 rounded-full bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span
              className="h-0.5 bg-gray-800 rounded-full block"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            ></motion.span>
            <motion.span
              className="h-0.5 bg-gray-800 rounded-full block"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            ></motion.span>
            <motion.span
              className="h-0.5 bg-gray-800 rounded-full block"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            ></motion.span>
          </div>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className="md:hidden overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: menuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col gap-2 bg-white/95 backdrop-blur-sm rounded-b-xl shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                className={`flex items-center gap-2 p-3 rounded-xl ${
                  item.active
                    ? "bg-gradient-to-r from-red-500 to-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          ))}
          <motion.a
            href="https://github.com/yourusername/pokedext"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl hover:bg-gray-100 text-gray-700"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMenuOpen(false)}
          >
            <Github size={18} />
            <span className="font-medium">GitHub</span>
          </motion.a>
        </div>
      </motion.nav>
    </motion.header>
  );
};
