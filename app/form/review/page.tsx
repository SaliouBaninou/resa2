"use client";

import { useFormStore } from "@/src/store/formStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as React from "react";

export default function ReviewPage() {
  const { data, resetData } = useFormStore();
  const router = useRouter();

  const handleSubmitForm = async () => {
    try {
      // Appel API pour sauvegarder les données en base de données
      const response = await fetch("/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("✓ Vos données ont été enregistrées avec succès !", {
          description: "Merci pour votre participation.",
          duration: 5000,
        });
        resetData();
        setTimeout(() => {
          router.push("/form/success");
        }, 1500);
      } else {
        toast.error("Une erreur est survenue lors de la sauvegarde");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    }
  };

  const handleEdit = (stepNumber: number) => {
    router.push(`/form/0${stepNumber}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">
        Résumé de votre réponse
      </h1>

      {/* --- Étape 1: Informations sur l'entreprise --- */}
      <section className="mb-8 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-600">
            1. Informations sur l&apos;entreprise
          </h2>
          <button
            onClick={() => handleEdit(1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Modifier
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">Nom de l&apos;entreprise</p>
            <p className="text-gray-800">{data.company_name || "Non renseigné"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Fonction</p>
            <p className="text-gray-800">{data.company_function || "Non renseigné"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Département/Service</p>
            <p className="text-gray-800">{data.company_departement || "Non renseigné"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Ancienneté</p>
            <p className="text-gray-800">{data.company_anciennete || "Non renseigné"}</p>
          </div>
        </div>
      </section>

      {/* --- Étape 2: Niveau d'automatisation --- */}
      <section className="mb-8 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-600">
            2. Niveau d&apos;automatisation
          </h2>
          <button
            onClick={() => handleEdit(2)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Modifier
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-gray-600 font-semibold">Procédés automatisés</p>
            <p className="text-gray-800">{data.procedes_automatisations || "Non renseigné"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Types d&apos;automatisation</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(data.types_automatisations) && data.types_automatisations.length > 0 ? (
                data.types_automatisations.map((type) => (
                  <span key={type} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {type}
                  </span>
                ))
              ) : (
                <p className="text-gray-800">Non renseigné</p>
              )}
            </div>
          </div>
          {data.autre_automatisation && (
            <div>
              <p className="text-gray-600 font-semibold">Autre automatisation</p>
              <p className="text-gray-800">{data.autre_automatisation}</p>
            </div>
          )}
          <div>
            <p className="text-gray-600 font-semibold">Niveau d&apos;automatisation</p>
            <p className="text-gray-800">{data.niveau_automatisation || "Non renseigné"}</p>
          </div>
        </div>
      </section>

      {/* --- Étape 3: Effets de l'automatisation --- */}
      <section className="mb-8 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-600">
            3. Effets de l&apos;automatisation
          </h2>
          <button
            onClick={() => handleEdit(3)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Modifier
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-gray-600 font-semibold">Impact sur la productivité</p>
            <p className="text-gray-800">{data.impacte_automatisation || "Non renseigné"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Impact sur la qualité</p>
            <p className="text-gray-800">{data.noncomformite_automatisation || "Non renseigné"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Impacts positifs observés</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(data.types_utiliser_automatisation) && data.types_utiliser_automatisation.length > 0 ? (
                data.types_utiliser_automatisation.map((impact) => (
                  <span key={impact} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {impact}
                  </span>
                ))
              ) : (
                <p className="text-gray-800">Non renseigné</p>
              )}
            </div>
          </div>
          {data.autre_utiliser_automatisation && (
            <div>
              <p className="text-gray-600 font-semibold">Autres impacts</p>
              <p className="text-gray-800">{data.autre_utiliser_automatisation}</p>
            </div>
          )}
        </div>
      </section>

      {/* --- Étape 4: Freins et limites --- */}
      <section className="mb-8 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-600">
            4. Freins et limites
          </h2>
          <button
            onClick={() => handleEdit(4)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Modifier
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-gray-600 font-semibold">Obstacles à l&apos;automatisation</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(data.obstacles_automatisation) && data.obstacles_automatisation.length > 0 ? (
                data.obstacles_automatisation.map((obstacle) => (
                  <span key={obstacle} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    {obstacle}
                  </span>
                ))
              ) : (
                <p className="text-gray-800">Non renseigné</p>
              )}
            </div>
          </div>
          {data.autre_obstacle_automatisation && (
            <div>
              <p className="text-gray-600 font-semibold">Autres obstacles</p>
              <p className="text-gray-800">{data.autre_obstacle_automatisation}</p>
            </div>
          )}
          <div>
            <p className="text-gray-600 font-semibold">Compétences locales</p>
            <p className="text-gray-800">{data.competences_locales || "Non renseigné"}</p>
          </div>
        </div>
      </section>

      {/* --- Étape 5: Recommandations --- */}
      <section className="mb-8 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-600">
            5. Perspectives et recommandations
          </h2>
          <button
            onClick={() => handleEdit(5)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Modifier
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-gray-600 font-semibold">Impact supplémentaire à moyen/long terme</p>
            <p className="text-gray-800 bg-gray-50 p-3 rounded">
              {data.recommandation_one_automatisation || "Non renseigné"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Recommandations pour l&apos;industrie gabonaise</p>
            <p className="text-gray-800 bg-gray-50 p-3 rounded">
              {data.recommandation_two_automatisation || "Non renseigné"}
            </p>
          </div>
        </div>
      </section>

      {/* --- Boutons d'action --- */}
      <div className="flex gap-4 justify-between mt-10">
        <button
          onClick={() => router.push("/form/05")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Retour à la dernière étape
        </button>
        <button
          onClick={handleSubmitForm}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-lg transition text-lg"
        >
          ✓ Confirmer et valider
        </button>
      </div>
    </div>
  );
}
