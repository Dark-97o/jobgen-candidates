import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Skiper27 / RollingText
 * 
 * Rolling text animation component featuring staggered character timing
 * radiating from the center to edges with smooth 3D perspective letter roll.
 * 
 * Usage:
 *   import { RollingText } from "@/components/v1/skiper27";
 *   <RollingText text="CUSTOM TEXT" speed={0.05} duration={1.2} />
 * 
 * Props:
 *   - text: The string of text to animate
 *   - speed: Delay between letters radiating from center (default: 0.04)
 *   - duration: Total animation duration per character (default: 0.8)
 *   - className: Additional CSS classes
 *   - style: Inline style overrides
 *   - loop: Boolean whether the rolling loop repeats continuously (default: false)
 *   - as: Wrapper component type (default: 'span')
 */
export function RollingText({
  text = '',
  speed = 0.04,
  duration = 0.8,
  className = '',
  style = {},
  loop = false,
  as: Component = 'span'
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: !loop, margin: '-5% 0px' });

  const rawText = String(text || '');
  const characters = Array.from(rawText);
  const centerIndex = Math.floor(characters.length / 2);

  // Group characters into words so line wrapping never breaks inside a word
  const words = rawText.split(' ');
  let globalCharIndex = 0;

  return (
    <Component
      ref={containerRef}
      className={`inline-flex flex-wrap items-baseline select-none ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        ...style
      }}
    >
      {words.map((word, wordIndex) => {
        const wordChars = Array.from(word);
        const startIndex = globalCharIndex;
        globalCharIndex += wordChars.length + 1; // +1 for the space

        return (
          <span
            key={`word-${wordIndex}`}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: wordIndex < words.length - 1 ? '0.28em' : 0 }}
          >
            {wordChars.map((char, charIdx) => {
              const currentGlobalIndex = startIndex + charIdx;
              const distanceFromCenter = Math.abs(currentGlobalIndex - centerIndex);
              const delay = distanceFromCenter * speed;

              return (
                <span
                  key={`char-${currentGlobalIndex}-${char}`}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    overflow: 'hidden',
                    height: '1.25em',
                    verticalAlign: 'bottom'
                  }}
                >
                  <motion.span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform'
                    }}
                    initial={{ y: '100%', rotateX: -90, opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            y: ['100%', '0%'],
                            rotateX: [-90, 0],
                            opacity: [0, 1]
                          }
                        : { y: '100%', rotateX: -90, opacity: 0 }
                    }
                    transition={{
                      duration: Math.min(Math.max(duration * 0.5, 0.45), 2.0),
                      delay,
                      ease: [0.16, 1, 0.3, 1],
                      ...(loop
                        ? {
                            repeat: Infinity,
                            repeatDelay: 2.5,
                            repeatType: 'reverse'
                          }
                        : {})
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        transformOrigin: '50% 100%'
                      }}
                    >
                      {char}
                    </span>
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
}

// Default export alias
export default RollingText;
export const Skiper27 = RollingText;
