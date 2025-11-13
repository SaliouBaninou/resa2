"use client";

import SideBare from "@/components/SideBare";
import { FormDataLoader } from "@/components/FormDataLoader";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

const variants: Variants = {
  enter: {
    opacity: 0,
    x: 80,
  },
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -80,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const getProgressPercentage = (pathname: string) => {
  if (pathname.includes("/form/01")) return 20;
  if (pathname.includes("/form/02")) return 40;
  if (pathname.includes("/form/03")) return 60;
  if (pathname.includes("/form/04")) return 80;
  if (pathname.includes("/form/05")) return 100;
  if (pathname.includes("/form/review")) return 100;
  return 0;
};

export default function FormLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const progress = getProgressPercentage(pathname);

  return (
    <div className="relative w-screen h-screen bg-gray-50 lg:p-10 flex flex-col" style={{ "--form-progress": `${progress}%` } as React.CSSProperties}>
      {/* Loader pour récupérer les données */}
      <FormDataLoader />

      {/* Barre de progression */}
      <div className="h-1 bg-gray-200 w-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: "var(--form-progress)" }}
        />
      </div>

      {/* Sidebar */}
      <SideBare />

      {/* Contenu principal */}
      <div
        className="
          flex-1 
          lg:ml-[300px]      /* espace pour sidebar desktop */
          pt-[70px] lg:pt-10 /* top padding responsive */
          px-4 lg:px-16      /* padding horizontal */
          pb-6 lg:pb-10      /* padding bas */
          overflow-y-auto     /* scroll activé */
          flex flex-col
          gap-4
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col gap-4"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
