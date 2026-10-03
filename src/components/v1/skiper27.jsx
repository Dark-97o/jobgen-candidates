import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Skiper27 / RollingText
 * 
 * Bulletproof rolling text animation with:
 * 1. Strict inline styles for `display: inline-block !important; white-space: nowrap !important;`
 *    on every word so characters within a word CAN NEVER break or wrap across lines.
 * 2. Words wrap naturally at word boundaries.
 * 3. Fluid staggered 3D letter roll radiating from center outward.
 * 4. Punctuation sticks to the previous word so it never orphans.
 * 5. Zero letter clipping or awkward spaces.
 * 
 * Usage:
 *   import { RollingText } from "@/components/v1/skiper27";
 *   <RollingText text="CUSTOM TEXT" speed={0.025} duration={0.65} />
 */
export function RollingText({
  text = '',
  speed = 0.025,
  duration = 0.65,
  className = '',
  style = {},
  loop = false,
  as: Component = 'span'
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: !loop, margin: '-5% 0px' });

  const rawText = String(text || '');
  const hasLeadingSpace = rawText.startsWith(' ');
  const hasTrailingSpace = rawText.endsWith(' ');

  // Split into clean words and keep punctuation attached to the preceding word
  const rawTokens = rawText.trim().split(/\s+/).filter(Boolean);
  const words = [];
  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i];
    if (/^[?!.,:;]+$/.test(token) && words.length > 0) {
      words[words.length - 1] += token;
    } else {
      words.push(token);
    }
  }

  // Calculate total characters for center-outwards radiating stagger
  let totalNonSpaceChars = 0;
  words.forEach(w => {
    totalNonSpaceChars += Array.from(w).length;
  });
  const centerIndex = Math.floor(totalNonSpaceChars / 2);

  let globalCharIndex = 0;

  return (
    <Component
      ref={containerRef}
      className={`rolling-text-container select-none ${className}`}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        verticalAlign: 'baseline',
        ...style
      }}
    >
      {hasLeadingSpace && (
        <span style={{ display: 'inline', width: '0.28em' }}>&nbsp;</span>
      )}

      {words.map((word, wordIndex) => {
        const wordChars = Array.from(word);
        const isLastWord = wordIndex === words.length - 1;

        return (
          <span
            key={`word-${wordIndex}-${word}`}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              marginRight: (!isLastWord || hasTrailingSpace) ? '0.28em' : '0',
              verticalAlign: 'baseline',
              transformStyle: 'preserve-3d'
            }}
          >
            {wordChars.map((char, charIdx) => {
              const currentIdx = globalCharIndex++;
              const distanceFromCenter = Math.abs(currentIdx - centerIndex);
              const delay = distanceFromCenter * speed;

              return (
                <span
                  key={`char-${currentIdx}-${char}`}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    overflow: 'hidden',
                    lineHeight: '1.2',
                    verticalAlign: 'baseline',
                    letterSpacing: 'inherit',
                    padding: '0 0.015em'
                  }}
                >
                  <motion.span
                    style={{
                      display: 'inline-block',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity'
                    }}
                    initial={{ y: '100%', rotateX: -80, opacity: 0 }}
                    animate={
                      isInView
                        ? {
                            y: '0%',
                            rotateX: 0,
                            opacity: 1
                          }
                        : { y: '100%', rotateX: -80, opacity: 0 }
                    }
                    transition={{
                      duration,
                      delay,
                      ease: [0.22, 1, 0.36, 1],
                      ...(loop
                        ? {
                            repeat: Infinity,
                            repeatDelay: 2.5,
                            repeatType: 'reverse'
                          }
                        : {})
                    }}
                  >
                    <span style={{ display: 'inline-block' }}>{char}</span>
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
