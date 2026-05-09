"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardAmbient from "@/components/dashboard/DashboardAmbient";
import HideTransition from "@/components/dashboard/HideTransition";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within DashboardWrapper");
  }
  return context;
}

export function DashboardWrapper({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      <div className="app">
        <HideTransition />
        <DashboardAmbient />

        {/* Animated Sidebar with Toggle Button */}
        <motion.div
          initial={false}
          animate={{
            width: isOpen ? 256 : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative flex flex-col overflow-hidden"
        >
          <div className="relative flex h-full w-64 flex-col select-none">
            {/* Toggle Button Inside Sidebar */}
            <motion.button
              onClick={toggleSidebar}
              className="absolute right-2 top-6 z-40 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.10] hover:border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </motion.button>

            <Sidebar />
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="main flex-1">
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
