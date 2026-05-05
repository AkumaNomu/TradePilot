"use client";

export function MouseReactiveBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.16]"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1.2px)",
        backgroundSize: "26px 26px"
      }}
    />
  );
}
