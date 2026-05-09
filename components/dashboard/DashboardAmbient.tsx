"use client";

export default function DashboardAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-[-12%] top-[-10%] h-[34rem] w-[34rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(77,142,255,0.10), transparent 70%)",
          filter: "blur(60px)"
        }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(76,215,246,0.08), transparent 70%)",
          filter: "blur(60px)"
        }}
      />
    </div>
  );
}
