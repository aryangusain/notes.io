"use client";

import { motion } from "motion/react";
import React from "react";


export const Loader = () => {
    
  return (
    <div className="flex items-center gap-2 absolute top-[50%] left-[50%]">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop" as const,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
        />
      ))}
    </div>
  );
};