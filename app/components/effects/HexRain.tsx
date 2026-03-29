"use client";

import { useEffect, useRef } from "react";

interface HexRainProps {
  className?: string;
  opacity?: number;
}

export function HexRain({ className = "", opacity = 0.15 }: HexRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const hexChars = "0123456789ABCDEF";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    let frameCount = 0;
    const draw = () => {
      frameCount++;
      // Render every 2nd frame for performance
      if (frameCount % 2 === 0) {
        ctx.fillStyle = `rgba(5, 5, 5, 0.05)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff9f";
        ctx.font = `${fontSize}px "SF Mono", "JetBrains Mono", monospace`;

        drops.forEach((y, i) => {
          const text = hexChars[Math.floor(Math.random() * 16)];
          const x = i * fontSize;
          const posY = y * fontSize;

          // Fade out near the bottom
          if (posY > canvas.height - 100) {
            const fade = (canvas.height - posY) / 100;
            ctx.globalAlpha = fade * opacity;
          } else {
            ctx.globalAlpha = opacity;
          }

          ctx.fillText(text, x, posY);
          ctx.globalAlpha = opacity;

          // Reset drop
          if (posY > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        });
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ opacity }}
    />
  );
}
