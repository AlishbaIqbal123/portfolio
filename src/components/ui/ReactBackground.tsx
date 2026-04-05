import React from 'react';
import { motion } from 'framer-motion';

export const ReactBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          color: 'var(--primary)'
        }}
      />
      
      {/* React Atom Style Circles */}
      <div className="absolute inset-0 flex items-center justify-center translate-y-[-10%] opacity-20">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[800px] h-[300px] border-[2px] border-primary/30 rounded-[100%]"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[800px] h-[300px] border-[2px] border-primary/30 rounded-[100%] rotate-[60deg]"
        />
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[800px] h-[300px] border-[2px] border-primary/30 rounded-[100%] rotate-[-60deg]"
        />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[150px]"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 
          }}
          animate={{
            y: [null, Math.random() * -100 - 50 + "px"],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute w-1 h-1 bg-primary rounded-full"
        />
      ))}
    </div>
  );
};
