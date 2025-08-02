"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beams = [
    { id: 1, left: "10%", delay: 0, duration: 15 },
    { id: 2, left: "30%", delay: 1, duration: 20 },
    { id: 3, left: "50%", delay: 2, duration: 15 },
    { id: 4, left: "70%", delay: 1, duration: 18 },
    { id: 5, left: "90%", delay: 3, duration: 16 },
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden -z-10", className)}>
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          initial={{
            y: -100,
            opacity: 0.5,
          }}
          animate={{
            y: "100vh",
            opacity: [0, 4, 0],
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            ease: "linear",
            delay: beam.delay,
            repeatDelay: 0,
          }}
          className="absolute top-0 h-32 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent"
          style={{ left: beam.left }}
        />
      ))}
    </div>
  );
};