"use client";

import { useEffect, useState } from "react";

/**
 * A subtle mouse-following glow element that adds interactivity.
 * Follows the cursor with smooth motion for an engaging effect.
 */
export function MouseFollower() {
  const [position, setPosition] = useState({ x: -400, y: -400 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let targetX = position.x;
    let targetY = position.y;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 160;
      targetY = e.clientY - 160;
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPosition({ x: currentX, y: currentY });
      requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed z-30 h-80 w-80 rounded-full transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "radial-gradient(circle, rgba(76,215,246,0.2), rgba(78,222,163,0.08), transparent 70%)",
        filter: "blur(80px)",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
