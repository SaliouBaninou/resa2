"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { id: 1, title: "Informations sur le répondant", url: "/form/01" },
  { id: 2, title: "Niveau d’automatisation de l’entreprise", url: "/form/02" },
  { id: 3, title: "Effets de l’automatisation sur la performance", url: "/form/03" },
  { id: 4, title: "Freins et limites de l’automatisation", url: "/form/04" },
  { id: 5, title: "Perspectives et recommandations", url: "/form/05" },
];

export default function SideBare() {
  const pathname = usePathname();
  const activeIndex = links.findIndex((link) => link.url === pathname);

  return (
    <div className="flex flex-col lg:h-[calc(100vh-100px)] lg:w-[300px] bg-[linear-gradient(180.45deg,#1369F3_-41.08%,#0B3D8D_113.84%)] rounded-[30px] p-6 lg:p-10 items-center justify-between text-white lg:fixed [tap-highlight-color:transparent]">
      
      {/* Logo */}
      <div className="hidden lg:block lg:mb-10">
        <Image src="/logo.png" alt="logo résa" width={86} height={55} />
      </div>

      {/* Liens Desktop */}
      <div className="hidden lg:flex flex-col gap-4 w-full relative">
        {links.map((link, index) => {
          const isActive = pathname === link.url;

          return (
            <Link key={link.id} href={link.url} className="flex items-center gap-3 relative">
              <motion.div
                animate={{
                  backgroundColor: isActive ? "#fff" : "transparent",
                  color: isActive ? "#0B3D8D" : "#fff",
                  borderColor: "#fff",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-[39px] h-[39px] border-2 rounded-full flex items-center justify-center font-semibold"
              >
                {link.id}
              </motion.div>

              <motion.p
                animate={{ color: isActive ? "#FACC15" : "#fff" }}
                transition={{ duration: 0.3 }}
                className="text-sm flex-1"
              >
                {link.title}
              </motion.p>

              {/* Indicateur à gauche */}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Illustration */}
      <div className="hidden lg:block">
        <Image src="/ill-01.png" alt="illustration" width={220} height={300} />
      </div>

      {/* Mobile : barre horizontale en haut */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#1369F3] to-[#0B3D8D] flex justify-around py-3 lg:hidden z-50">
        {links.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link key={link.id} href={link.url}>
              <motion.div
                animate={{
                  backgroundColor: isActive ? "#fff" : "transparent",
                  color: isActive ? "#0B3D8D" : "#fff",
                  borderColor: "#fff",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-[35px] h-[35px] border-2 rounded-full flex items-center justify-center font-semibold text-white"
              >
                {link.id}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
