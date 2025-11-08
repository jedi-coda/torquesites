"use client";

import Header from "@/components/Header";
import VIPSection from "@/components/VIPSection";

export default function VIPExclusivePage() {
  return (
    <div className="bg-gradient-to-b from-[#0E0E0E] to-[#1A1A1A] backdrop-blur-md min-h-screen">
      <main className="font-sans text-white">
        {/* HEADER */}
        <Header />

        {/* VIP EXCLUSIVE PRICING SECTION */}
        <VIPSection />

        {/* FOOTER */}
        <footer className="mt-20 border-t border-t-lime-500/20 pt-10 text-center text-sm text-muted-foreground relative">
          <p className="text-xs text-neutral-400 mb-8">
            Powered by <span className="text-lime-400">TorqueSites</span>. Engineered in the UK. © 2025 TorqueSites Ltd. All rights reserved.
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />
        </footer>
      </main>
    </div>
  );
}

