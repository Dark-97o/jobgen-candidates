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
 *   <RollingText text="CUSTOM TEXT" speed={0.05} duration={4} />
 * 
 * Props:
 *   - text: The string of text to animate
 *   - speed: Delay between letters radiating from center (default: 0.05)
 *   - duration: Total animation duration / cycle speed (default: 1.2s to 4s)
 *   - className: Additional CSS classes
 *   - style: Inline style overrides
 *   - loop: Boolean whether the rolling loop repeats continuously (default: false)
 */
export function RollingText({
  text = '',
  speed = 0.05,
  duration = 0.9,
  className = '',
  style = {},
  loop = false
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: !loop, margin: '-10% 0px' });

  const characters = Array.from(String(text || ''));
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap items-center justify-center select-none ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        lineHeight: 1.1,
        ...style
      }}
    >
      {characters.map((char, index) => {
        const isSpace = char === ' ';
        // Radiate stagger from center index outward
        const distanceFromCenter = Math.abs(index - centerIndex);
        const delay = distanceFromCenter * speed;

        if (isSpace) {
          return (
            <span
              key={`space-${index}`}
              style={{ display: 'inline-block', width: '0.3em' }}
            >
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={`char-${index}-${char}`}
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
                duration: Math.min(Math.max(duration * 0.4, 0.6), 2.5),
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
              {/* Primary Rolling Character */}
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
}

// Default export alias
export default RollingText;
export const Skiper27 = RollingText;
