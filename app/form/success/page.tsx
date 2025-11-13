"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirection automatique après 3 secondes
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-green-600 rounded-full flex items-center justify-center text-white text-5xl">
            ✓
          </div>
        </div>

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Formulaire validé !
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Merci d&apos;avoir complété le sondage sur l&apos;automatisation dans l&apos;industrie gabonaise.
        </p>

        <p className="text-gray-600 mb-8">
          Vos réponses ont été enregistrées avec succès et seront analysées pour contribuer à notre étude.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">
            Redirection automatique dans 3 secondes...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse w-full" />
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Retour à l&apos;accueil
        </button>
      </div>
    </div>
  );
}
