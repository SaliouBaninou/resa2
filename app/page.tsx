"use client";

import HomeTopBar from "@/components/TopBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
     <HomeTopBar />
    <section className="relative flex flex-col justify-center items-center min-h-screen px-6 py-12 md:px-20 text-center overflow-hidden bg-white">
      {/* 🌊 Fond animé bleu */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[140%] h-[140%] top-[-20%] left-[-20%] animate-blueFlow opacity-40"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative max-w-2xl p-10 rounded-3xl bg-white/70 backdrop-blur-md border border-blue-100 shadow-lg space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#1369F3] to-[#0B3D8D] bg-clip-text text-transparent">
          Questionnaire d’enquête
        </h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Ce questionnaire académique vise à évaluer l’impact de l’automatisation sur la production industrielle au Gabon, 
          de manière totalement confidentielle.
        </p>

        <div className="mt-10">
          <Link
            href="/form/01"
            className="inline-flex items-center gap-3 bg-[#1369F3] hover:bg-[#0B3D8D] transition-all duration-300 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl"
          >
            Commencer
            <Image
              src="/arrow.svg"
              alt="Flèche vers la droite"
              width={16}
              height={16}
              className="ml-1"
            />
          </Link>
        </div>
      </div>

      {/* 💫 Animation CSS du fond */}
      <style jsx>{`
        @keyframes blueFlow {
          0% {
            background: radial-gradient(
              circle at 0% 0%,
              rgba(19, 106, 243, 0.3),
              transparent 70%
            );
          }
          50% {
            background: radial-gradient(
              circle at 100% 100%,
              rgba(11, 61, 141, 0.25),
              transparent 70%
            );
          }
          100% {
            background: radial-gradient(
              circle at 0% 0%,
              rgba(19, 106, 243, 0.3),
              transparent 70%
            );
          }
        }
        .animate-blueFlow {
          animation: blueFlow 12s ease-in-out infinite;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    </section>
    </>
  );
}
