"use client";

import NextBtn from "@/components/NextBtn";
import PrevBtn from "@/components/PrevBtn";
import { FormErrors } from "@/src/types/form-type";
import { useFormStore } from "@/src/store/formStore";
import * as React from "react";
import { stepThreeFormAction } from "./actions";
import { FormRadioGroup } from "@/components/FormRadioGroup";
import { FormCheckboxGroup } from "@/components/FormCheckboxGroup";
import { FormToggleField } from "@/components/FormToggleField";

const echelleOptions = [
  { label: "1 - Pas du tout d&apos;accord", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5 - Totalement d&apos;accord", value: "5" },
];

const automatisationContributionOptions = [
  { label: "Réduire les coûts de production", value: "reduire-les-couts-de-production" },
  { label: "Améliorer la rapidité d&apos;exécution", value: "ameliorer-la-rapidite-d-execution" },
  { label: "Optimiser la sécurité des employés", value: "optimiser-la-securite-des-employes" },
  { label: "Améliorer la traçabilité et le suivi", value: "ameliorer-la-tracabilite-et-le-suivi" },
];

const initialState: FormErrors = {};

export default function Step03() {
  const { data, updateData } = useFormStore();
  const [serverErrors, formAction] = React.useActionState(stepThreeFormAction, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const fd = new FormData(form);
    const entries = Array.from(fd.entries());
    const payload: Record<string, unknown> = {};
    for (const [k, v] of entries) {
      if (Object.prototype.hasOwnProperty.call(payload, k)) {
        // Clé existe déjà : consolider en tableau
        const current = payload[k as string];
        if (Array.isArray(current)) {
          current.push(v);
        } else {
          payload[k as string] = [current, v];
        }
      } else {
        // Première occurrence : commencer par un tableau si c'est un checkbox
        if (
          k === "obstacles_automatisation" ||
          k === "types_automatisations" ||
          k === "types_utiliser_automatisation"
        ) {
          payload[k as string] = [v];
        } else {
          payload[k as string] = v;
        }
      }
    }
    updateData(payload as Partial<Record<string, unknown>>);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-10">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">
        Effets de l&apos;automatisation sur la performance
      </h1>

      {/* --- Impact sur la productivité --- */}
      <div>
        <h2 className="text-lg font-semibold">L&apos;automatisation a eu un impact significatif sur la productivité de votre entreprise.</h2>
        <span className="text-xs text-gray-500">Sur une échelle de 1 à 5</span>
        <div className="mt-4">
          <FormRadioGroup
            name="impacte_automatisation"
            options={echelleOptions}
            error={serverErrors?.impacte_automatisation}
            defaultValue={data.impacte_automatisation}
          />
        </div>
      </div>

      {/* --- Qualité et conformité --- */}
      <div>
        <h2 className="text-lg font-semibold">En termes de qualité, l&apos;automatisation a permis de réduire les défauts et les non-conformités.</h2>
        <span className="text-xs text-gray-500">Sur une échelle de 1 à 5</span>
        <div className="mt-4">
          <FormRadioGroup
            name="noncomformite_automatisation"
            options={echelleOptions}
            error={serverErrors?.noncomformite_automatisation}
            defaultValue={data.noncomformite_automatisation}
          />
        </div>
      </div>

      {/* --- Types d&apos;automatisation utilisés --- */}
      <div>
        <h2 className="text-lg font-semibold">Quels impacts positifs avez-vous observés suite à l&apos;automatisation ?</h2>
        <span className="text-xs text-gray-500">Plusieurs réponses peuvent être attendues</span>
        <div className="mt-4 space-y-4">
          <FormCheckboxGroup
            name="types_utiliser_automatisation"
            options={automatisationContributionOptions}
            error={serverErrors?.types_utiliser_automatisation}
            defaultValue={data.types_utiliser_automatisation}
          />
          <FormToggleField
            label="Autres impacts"
            textLabel="Précisez"
            toggleName="autre_utiliser_automatisation_enabled"
            textName="autre_utiliser_automatisation"
            error={serverErrors?.autre_utiliser_automatisation}
            defaultValue={data.autre_utiliser_automatisation}
          />
        </div>
      </div>

      {/* --- Boutons de navigation --- */}
      <div className="flex justify-between mt-6">
        <PrevBtn />
        <NextBtn />
      </div>
    </form>
  );
}