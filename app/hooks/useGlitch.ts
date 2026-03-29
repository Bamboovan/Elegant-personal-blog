"use client";

import { useState, useEffect, useCallback } from "react";

interface UseGlitchOptions {
  interval?: number;
  duration?: number;
  probability?: number;
}

export function useGlitch(options: UseGlitchOptions = {}) {
  const { interval = 5000, duration = 200, probability = 0.3 } = options;
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() < probability) {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
        }, duration);
      }
    };

    const timer = setInterval(triggerGlitch, interval);
    return () => clearInterval(timer);
  }, [interval, duration, probability]);

  const trigger = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
    }, duration);
  }, [duration]);

  return { isGlitching, trigger };
}

// Text scrambling effect
export function useTextScramble(
  text: string,
  chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, chars]);

  return { displayText, isScrambling, scramble };
}
