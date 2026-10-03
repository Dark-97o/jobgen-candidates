"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Skiper8 / WordsPreloader
 * 
 * Dennis Snellenberg inspired typography-based words preloader component:
 * - Fluid multilingual word-switching animation ("Hello", "Bonjour", "Ciao", etc.)
 * - Deep semi-circle curved SVG bottom wipe that arches up over the page
 * - No glowing dot (clean minimalist typography)
 * - Transparent container with visible overflow so the semi-circle arch is prominently visible
 * - Custom cubic-bezier tension easing [0.76, 0, 0.24, 1]
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
    y: 10
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.16, ease: "easeIn" }
  }
};

export function Skiper8({
  words = DEFAULT_WORDS,
  backgroundColor = "#141516",
  textColor = "#FFFFFF",
  firstWordDelay = 350,
  wordInterval = 110,
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
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
    };
  }, [isExiting]);

  useEffect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        const completeTimer = setTimeout(() => {
          onComplete?.();
        }, 650);
        return () => clearTimeout(completeTimer);
      }, 120);
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

  // Deep semi-circle curve depth (scaled proportionally with width)
  const curveDepth = Math.max(220, Math.min(Math.round(width * 0.32), 650));

  // Initial path: covers the full screen with a deep semi-circular curve hanging below the viewport
  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + curveDepth} 0 ${height} L0 0`;
  // Target path: smooths slightly as it clears the top
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.15 }
    }
  };

  const slideUpVariants = {
    initial: {
      top: 0
    },
    exit: {
      top: `calc(-100vh - ${curveDepth}px)`,
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.08 }
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
            backgroundColor: "transparent", // Transparent container so the SVG semi-circle is 100% visible
            overflow: "visible", // Allows the curved semi-circle to project below without clipping
            pointerEvents: "auto",
            userSelect: "none",
            ...style
          }}
        >
          {dimension.width > 0 && (
            <>
              {/* Clean Typography Word Display (No Glowing Dot) */}
              <div
                style={{
                  position: "absolute",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none"
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={words[index]}
                    variants={opacityVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: "clamp(34px, 4.5vw, 56px)",
                      fontWeight: 700,
                      letterSpacing: "-0.035em",
                      color: textColor,
                      margin: 0,
                      padding: 0,
                      textAlign: "center"
                    }}
                  >
                    {words[index]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Full-Bleed Curved SVG Overlay (The Semi-Circle Curtain) */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `calc(100% + ${curveDepth}px)`,
                  overflow: "visible",
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
