"use client";

import * as React from "react";
import NextBtn from "@/components/NextBtn";
import PrevBtn from "@/components/PrevBtn";
import { FormErrors } from "@/src/types/form-type";
import { useFormStore } from "@/src/store/formStore";
import { stepTwoFormAction } from "./actions";
import { FormRadioGroup } from "@/components/FormRadioGroup";
import { FormCheckboxGroup } from "@/components/FormCheckboxGroup";
import { FormToggleField } from "@/components/FormToggleField";

const automatisationOptions = [
  { label: "Partiellement", value: "partiellement" },
  { label: "Majoritairement", value: "majoritairement" },
  { label: "Non", value: "non" },
];

const typesAutomatisationsOptions = [
  { label: "Automates programmables", value: "automates-programmables" },
  { label: "Chaînes de production robotisées", value: "chaines-de-production-robotisees" },
  { label: "Système de contrôle / Monitoring", value: "systeme-de-controle-monitoring" },
];

const automatisattionLevels = [
  { label: "Très faible", value: "tres-faible" },
  { label: "Faible", value: "faible" },
  { label: "Moyen", value: "moyen" },
  { label: "Fort", value: "fort" },
  { label: "Très fort", value: "tres-fort" },
];

const initialState: FormErrors = {};


export default function Step02() {
  const { data, updateData } = useFormStore();
  const [serverErrors, formAction] = React.useActionState(stepTwoFormAction, initialState);

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
        Niveau d&apos;automatisation de l&apos;entreprise
      </h1>

      {/* --- Procédés automatisés --- */}
      <div>
        <h2 className="text-lg font-semibold">Votre entreprise dispose t&apos;elle de procédés automatisés dans la production ?</h2>
        <span className="text-xs text-gray-500">Une seule réponse est attendue</span>
        <div className="mt-4">
          <FormRadioGroup
            name="procedes_automatisations"
            options={automatisationOptions}
            error={serverErrors?.procedes_automatisations}
            defaultValue={data.procedes_automatisations}
          />
        </div>
      </div>

      {/* --- Types d'automatisation --- */}
      <div>
        <h2 className="text-lg font-semibold">Quels types d&apos;automatisation utilisez-vous principalement ?</h2>
        <span className="text-xs text-gray-500">Plusieurs réponses peuvent être attendues</span>
        <div className="mt-4 space-y-4">
          <FormCheckboxGroup
            name="types_automatisations"
            options={typesAutomatisationsOptions}
            error={serverErrors?.types_automatisations}
            defaultValue={data.types_automatisations}
          />
          <FormToggleField
            label="Autres"
            textLabel="Précisez"
            toggleName="autre_automatisation_enabled"
            textName="autre_automatisation"
            error={serverErrors?.autre_automatisation}
            defaultValue={data.autre_automatisation}
          />
        </div>
      </div>

      {/* --- Niveau d'automatisation --- */}
      <div>
        <h2 className="text-lg font-semibold">Selon vous, le niveau d&apos;automatisation actuel de votre entreprise est ?</h2>
        <span className="text-xs text-gray-500">Une seule réponse est attendue</span>
        <div className="mt-4">
          <FormRadioGroup
            name="niveau_automatisation"
            options={automatisattionLevels}
            error={serverErrors?.niveau_automatisation}
            defaultValue={data.niveau_automatisation}
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
