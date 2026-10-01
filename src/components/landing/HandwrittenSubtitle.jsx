import React, { useEffect, useState } from 'react';

/**
 * HandwrittenSubtitle
 * Human handwriting animation for "Land your next dream job".
 * Features:
 * - Human cursive typography using 'Caveat' with natural baseline micro-variation.
 * - Human cadence: rapid cursive letter connections within words and natural hand-shift pauses between words.
 * - Clean, sleek handwriting flow without any floating marker or pen head.
 */
export default function HandwrittenSubtitle({
  text = 'Land your next dream job',
  delay = 450,
  style = {}
}) {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    let timeoutId;
    let isCancelled = false;

    timeoutId = setTimeout(() => {
      if (isCancelled) return;

      const writeNextChar = (index) => {
        if (isCancelled) return;

        setRevealedCount(index);

        if (index >= text.length) return;

        const currentChar = text[index];
        // Human cadence: natural hand movement pause between words, fluid cursive within words
        let nextDelay = 42 + Math.floor(Math.random() * 20); // 42-62ms per letter
        if (currentChar === ' ') {
          nextDelay = 150; // pause between words
        } else if (index === 0) {
          nextDelay = 80;
        }

        setTimeout(() => writeNextChar(index + 1), nextDelay);
      };

      writeNextChar(1);
    }, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, delay]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        userSelect: 'none',
        ...style
      }}
    >
      <span
        style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 'clamp(30px, 3.5vw, 48px)',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1.1,
          color: '#FFFFFF',
          textShadow: '0 3px 12px rgba(0, 18, 70, 0.55), 0 0 2px rgba(255, 255, 255, 0.4)',
          display: 'inline-block',
          whiteSpace: 'nowrap'
        }}
      >
        {text.split('').map((char, index) => {
          const isVisible = index < revealedCount;
          // Organic subtle cursive baseline variation
          const bobY = Math.sin(index * 1.8) * 0.8;

          return (
            <span
              key={`hw-${index}`}
              style={{
                display: 'inline-block',
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? `translateY(${bobY}px)`
                  : 'translateY(5px) scale(0.88)',
                transition: 'opacity 0.14s ease-out, transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: char === ' ' ? 'pre' : 'normal',
                willChange: 'opacity, transform'
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </div>
  );
}
