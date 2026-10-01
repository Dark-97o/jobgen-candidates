import React, { useState, useEffect } from 'react';

/**
 * RevealingTitle
 * Human reveal animation for "JobGen.IO" matching the handwriting reveal of the subtitle.
 * Characters appear sequentially with fluid cadence, micro-scale pop, and smooth opacity.
 */
export default function RevealingTitle({
  text = 'JobGen.IO',
  delay = 200,
  onComplete,
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

        if (index >= text.length) {
          if (onComplete) onComplete();
          return;
        }

        // Fluid reveal cadence
        const currentChar = text[index];
        const nextDelay = currentChar === '.' ? 110 : (52 + Math.floor(Math.random() * 20));

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
    <span style={{ display: 'inline-flex', alignItems: 'center', ...style }}>
      {text.split('').map((char, index) => {
        const isVisible = index < revealedCount;
        return (
          <span
            key={`title-char-${index}`}
            style={{
              display: 'inline-block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translateY(0) scale(1)'
                : 'translateY(8px) scale(0.9)',
              transition: 'opacity 0.15s ease-out, transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'opacity, transform'
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
