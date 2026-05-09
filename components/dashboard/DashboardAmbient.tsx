"use client";

export default function DashboardAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-[-12%] top-[-10%] h-[36rem] w-[36rem] rounded-full animate-drift-slow"
        style={{
          background: "radial-gradient(circle, rgba(77,142,255,0.12), transparent 70%)",
          filter: "blur(60px)"
        }}
      />
      <div
        className="absolute right-[-10%] top-[18%] h-[30rem] w-[30rem] rounded-full animate-float-y"
        style={{
          background: "radial-gradient(circle, rgba(76,215,246,0.10), transparent 70%)",
          filter: "blur(60px)"
        }}
      />
      <div
        className="absolute left-[40%] bottom-[-12%] h-[32rem] w-[32rem] rounded-full animate-drift-slow"
        style={{
          background: "radial-gradient(circle, rgba(78,222,163,0.08), transparent 70%)",
          filter: "blur(60px)"
        }}
      />
    </div>
  );
}
