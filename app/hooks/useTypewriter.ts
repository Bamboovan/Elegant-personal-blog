"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
) {
  const { speed = 50, delay = 0 } = options;
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayText("");
    setIsComplete(false);
    setIsTyping(false);

    // Start typing after delay
    const delayTimer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;

      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          setIsTyping(false);
          clearInterval(timer);
        }
      }, speed);

      // Cleanup interval on unmount or text change
      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, delay]);

  const reset = useCallback(() => {
    setDisplayText("");
    setIsComplete(false);
    setIsTyping(false);
  }, []);

  return { displayText, isComplete, isTyping, reset };
}

// Type multiple lines sequentially
interface TypewriterLine {
  text: string;
  speed?: number;
  delay?: number;
}

export function useMultiLineTypewriter(
  lines: TypewriterLine[],
  globalDelay: number = 0
) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setCurrentLine(0);
    setCompletedLines([]);
    setIsComplete(false);

    const startTimer = setTimeout(() => {
      processLines(0);
    }, globalDelay);

    return () => clearTimeout(startTimer);
  }, [lines, globalDelay]);

  const processLines = (index: number) => {
    if (index >= lines.length) {
      setIsComplete(true);
      return;
    }

    const line = lines[index];
    const speed = line.speed || 30;
    const delay = line.delay || 500;
    let charIndex = 0;

    const typeTimer = setInterval(() => {
      if (charIndex < line.text.length) {
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setCompletedLines((prev) => [...prev, line.text]);
        setCurrentLine(index + 1);

        setTimeout(() => {
          processLines(index + 1);
        }, delay);
      }
    }, speed);

    return () => clearInterval(typeTimer);
  };

  return {
    currentLine,
    completedLines,
    isComplete,
    progress: lines.length > 0 ? currentLine / lines.length : 0,
  };
}
