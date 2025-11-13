"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function PrevBtn() {
  const router = useRouter();
  const pathname = usePathname();

  const getPrevPath = () => {
    if (pathname.includes("/form/02")) return "/form/01";
    if (pathname.includes("/form/03")) return "/form/02";
    if (pathname.includes("/form/04")) return "/form/03";
    if (pathname.includes("/form/05")) return "/form/04";
    if (pathname.includes("/form/review")) return "/form/05";
    return "/form/01";
  };

  return (
    <button
      type="button"
      onClick={() => router.push(getPrevPath())}
      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded transition"
    >
      <Image className="rotate-180" src="/arrow.svg" alt="Flèche vers la gauche" width={8} height={8} />
      <span>Précédent</span>
    </button>
  );
}