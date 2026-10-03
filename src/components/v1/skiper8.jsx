"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Skiper8 / WordsPreloader
 * 
 * Dennis Snellenberg inspired typography-based words preloader component from Skiper UI:
 * - Fluid multilingual word-switching animation ("Hello", "Bonjour", "Ciao", etc.)
 * - Signature curved SVG bottom wipe with cubic-bezier tension easing [0.76, 0, 0.24, 1]
 * - Smooth exit animation sliding up out of view on load completion
 * - Highly customizable word list, colors, speed, and callback hooks
 * 
 * Usage:
 *   import { Skiper8, WordsPreloader } from "@/components/v1/skiper8";
 *   <Skiper8 onComplete={() => console.log('Ready!')} />
 */

const DEFAULT_WORDS = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo"
];

const opacityVariants = {
  initial: {
    opacity: 0,
    y: 8
  },
  enter: {
    opacity: 0.95,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export function Skiper8({
  words = DEFAULT_WORDS,
  backgroundColor = "#141516",
  textColor = "#FFFFFF",
  dotColor = "#FFFFFF",
  firstWordDelay = 800,
  wordInterval = 160,
  onComplete,
  className = "",
  style = {}
}) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        width: typeof window !== "undefined" ? window.innerWidth : 1920,
        height: typeof window !== "undefined" ? window.innerHeight : 1080
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isExiting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExiting]);

  useEffect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        const completeTimer = setTimeout(() => {
          onComplete?.();
        }, 850);
        return () => clearTimeout(completeTimer);
      }, 350);
      return () => clearTimeout(exitTimer);
    }

    const timer = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? firstWordDelay : wordInterval
    );

    return () => clearTimeout(timer);
  }, [index, words.length, firstWordDelay, wordInterval, onComplete]);

  const width = dimension.width || 1920;
  const height = dimension.height || 1080;

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.25 }
    }
  };

  const slideUpVariants = {
    initial: {
      top: 0
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          variants={slideUpVariants}
          initial="initial"
          exit="exit"
          className={`skiper8-preloader ${className}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            backgroundColor,
            overflow: "hidden",
            pointerEvents: "auto",
            userSelect: "none",
            ...style
          }}
        >
          {dimension.width > 0 && (
            <>
              {/* Animated Text Display with Luminous Dot */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: dotColor,
                    boxShadow: `0 0 12px ${dotColor}`,
                    flexShrink: 0
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={words[index]}
                    variants={opacityVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: "clamp(34px, 4vw, 48px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: textColor,
                      margin: 0,
                      padding: 0
                    }}
                  >
                    {words[index]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Curved Bottom SVG Transition Overlay */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "calc(100% + 300px)",
                  pointerEvents: "none"
                }}
              >
                <motion.path
                  variants={curveVariants}
                  initial="initial"
                  exit="exit"
                  fill={backgroundColor}
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const WordsPreloader = Skiper8;
export default Skiper8;
