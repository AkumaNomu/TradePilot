"use client";

import { motion } from "framer-motion";

export default function DashboardAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute left-[-10%] top-[4%] h-[28rem] w-[28rem] rounded-full blur-[140px]"
        style={{ background: "rgba(77, 142, 255, 0.10)" }}
        animate={{ x: [0, 28, 0], y: [0, -18, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-6%] top-[18%] h-[24rem] w-[24rem] rounded-full blur-[140px]"
        style={{ background: "rgba(76, 215, 246, 0.08)" }}
        animate={{ x: [0, -24, 0], y: [0, 22, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-12%] left-[26%] h-[28rem] w-[28rem] rounded-full blur-[160px]"
        style={{ background: "rgba(78, 222, 163, 0.08)" }}
        animate={{ x: [0, 16, 0], y: [0, -22, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(76,215,246,0.35), transparent)" }}
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
