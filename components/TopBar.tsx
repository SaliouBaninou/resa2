"use client";

import Link from "next/link";

export default function HomeTopBar() {
  return (
    <header className="fixed top-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl rounded-3xl px-6 py-3 flex items-center justify-between z-50
                       bg-white/70 backdrop-blur-md shadow-lg">
      {/* Logo / Nom */}
      <div className="text-lg font-bold text-[#1369F3]">
        RésaForm
      </div>

      {/* Bouton Se connecter */}
      <Link
        href="/login"
        className="bg-[#1369F3] hover:bg-[#0B3D8D] text-white font-semibold px-4 py-1.5 rounded-full shadow-sm text-sm transition-colors"
      >
        Se connecter
      </Link>
    </header>
  );
}
