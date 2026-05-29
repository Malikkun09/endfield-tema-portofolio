import { useState, useEffect, useCallback, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export function useScrambleText(finalText: string, options?: { delay?: number; duration?: number; trigger?: boolean }) {
  const { delay = 0, duration = 1500, trigger = true } = options || {};
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScramble = useCallback(() => {
    setIsComplete(false);
    const length = finalText.length;
    let iteration = 0;
    const maxIterations = Math.floor(duration / 30);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const progress = iteration / maxIterations;
      const revealedCount = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (i < revealedCount) {
          result += finalText[i];
        } else if (finalText[i] === ' ') {
          result += ' ';
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);
      iteration++;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(finalText);
        setIsComplete(true);
      }
    }, 30);
  }, [finalText, duration]);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        startScramble();
      }, delay);
      return () => {
        clearTimeout(timer);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [trigger, delay, startScramble]);

  return { displayText, isComplete, startScramble };
}

export function useHoverScramble(finalText: string, hoverText: string) {
  const [displayText, setDisplayText] = useState(finalText);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const target = hoverText;
    let iteration = 0;
    const maxIterations = 15;

    intervalRef.current = setInterval(() => {
      const progress = iteration / maxIterations;
      const revealedCount = Math.floor(progress * target.length);

      let result = '';
      for (let i = 0; i < target.length; i++) {
        if (i < revealedCount) {
          result += target[i];
        } else if (target[i] === ' ') {
          result += ' ';
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);
      iteration++;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(target);
      }
    }, 30);
  }, [hoverText]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const maxIterations = 15;

    intervalRef.current = setInterval(() => {
      const progress = iteration / maxIterations;
      const revealedCount = Math.floor(progress * finalText.length);

      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        if (i < revealedCount) {
          result += finalText[i];
        } else if (finalText[i] === ' ') {
          result += ' ';
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);
      iteration++;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(finalText);
      }
    }, 30);
  }, [finalText]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { displayText, isHovered, handleMouseEnter, handleMouseLeave };
}
