"use client";

import type React from "react";
import { motion } from "framer-motion";

interface PokeballProps {
  className?: string;
  size?: number;
  color?: string;
}

export const Pokeball: React.FC<PokeballProps> = ({
  className = "",
  size = 40,
  color = "#E53935",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="48"
        fill="white"
        stroke="black"
        strokeWidth="4"
      />
      <motion.path
        d="M50 20C63.2548 20 74 30.7452 74 44H26C26 30.7452 36.7452 20 50 20Z"
        fill={color}
      />
      <motion.path
        d="M50 80C36.7452 80 26 69.2548 26 56H74C74 69.2548 63.2548 80 50 80Z"
        fill="white"
      />
      <motion.path d="M2 50H98" stroke="black" strokeWidth="4" />
      <motion.circle
        cx="50"
        cy="50"
        r="12"
        fill="white"
        stroke="black"
        strokeWidth="4"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};
