"use client";

import type React from "react";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Pokeball3DProps {
  className?: string;
  size?: number;
  rotationSpeed?: number;
}

export const Pokeball3D: React.FC<Pokeball3DProps> = ({
  className = "",
  size = 200,
  rotationSpeed = 2,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start({
        rotateY: 360,
        transition: {
          duration: rotationSpeed,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, inView, rotationSpeed]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
        perspective: size * 2,
      }}
    >
      <div
        className="absolute w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, #fff 0%, #f0f0f0 60%, #d0d0d0 100%)`,
          boxShadow: `0 ${size / 20}px ${size / 10}px rgba(0,0,0,0.2)`,
          transform: "rotateX(20deg)",
          overflow: "hidden",
        }}
      >
        {/* Top half (red) */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-red-600"
          style={{
            background: "linear-gradient(to bottom, #E53935 0%, #C62828 100%)",
          }}
        />

        {/* Bottom half (white) */}
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 bg-white"
          style={{
            background: "linear-gradient(to top, #f5f5f5 0%, #ffffff 100%)",
          }}
        />

        {/* Middle black line */}
        <div className="absolute top-1/2 left-0 w-full h-[6%] bg-black transform -translate-y-1/2" />

        {/* Center button */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] rounded-full bg-white border-4 border-black"
          style={{
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full bg-white border-2 border-black" />
        </div>

        {/* Highlight effect */}
        <div className="absolute top-[15%] left-[15%] w-[20%] h-[10%] rounded-full bg-white opacity-60 transform rotate-45" />
      </div>
    </motion.div>
  );
};
