import Image from "next/image";

export default function NextBtn() {
  return (
    <button
      type="submit"
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
    >
      <span>Suivant</span>
      <Image src="/arrow.svg" alt="Flèche vers la droite" width={8} height={8} />
    </button>
  );
}