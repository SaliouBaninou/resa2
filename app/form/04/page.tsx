"use client";

import NextBtn from "@/components/NextBtn";
import PrevBtn from "@/components/PrevBtn";
import { FormErrors } from "@/src/types/form-type";
import { useFormStore } from "@/src/store/formStore";
import * as React from "react";
import { stepFourFormAction } from "./actions";
import { FormCheckboxGroup } from "@/components/FormCheckboxGroup";
import { FormRadioGroup } from "@/components/FormRadioGroup";
import { FormToggleField } from "@/components/FormToggleField";

const automatisationLocales = [
  { label: "Oui, largement", value: "oui-largement" },
  { label: "Oui, mais limitées", value: "oui-mais-limitees" },
  { label: "Non, insuffisantes", value: "non-insuffisantes" },
];

const automatisationObstacles = [
  { label: "Coûts élevés d&apos;investissement", value: "couts-eleves-d-investissement" },
  { label: "Manque de personnel qualifié", value: "manque-de-personnel-qualifie" },
  { label: "Maintenance difficile", value: "maintenance-difficile" },
  { label: "Résistance au changement du personnel", value: "resistance-au-changement-du-personnel" },
];

const initialState: FormErrors = {};

export default function Step04() {
  const { data, updateData } = useFormStore();
  const [serverErrors, formAction] = React.useActionState(stepFourFormAction, initialState);

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
        // Première occurrence : commencer par un tableau si c'est un checkbox (pour cohérence)
        // Ou une valeur simple sinon. Ici on va vérifier le name pour les checkboxes.
        // Simpler : toujours créer un tableau pour les noms connus comme checkboxes
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
        Freins et limites de l&apos;automatisation
      </h1>

      {/* --- Obstacles à l'automatisation --- */}
      <div>
        <h2 className="text-lg font-semibold">Quels sont les principaux obstacles à l&apos;automatisation dans votre entreprise ?</h2>
        <span className="text-xs text-gray-500">Plusieurs réponses peuvent être attendues</span>
        <div className="mt-4 space-y-4">
          <FormCheckboxGroup
            name="obstacles_automatisation"
            options={automatisationObstacles}
            error={serverErrors?.obstacles_automatisation}
            defaultValue={data.obstacles_automatisation}
          />
          <FormToggleField
            label="Autres obstacles"
            textLabel="Précisez"
            toggleName="autre_obstacle_automatisation_enabled"
            textName="autre_obstacle_automatisation"
            error={serverErrors?.autre_obstacle_automatisation}
            defaultValue={data.autre_obstacle_automatisation}
          />
        </div>
      </div>

      {/* --- Compétences locales --- */}
      <div>
        <h2 className="text-lg font-semibold">Selon vous, les compétences locales sont-elles suffisantes pour gérer les systèmes automatisés ?</h2>
        <span className="text-xs text-gray-500">Une seule réponse est attendue</span>
        <div className="mt-4">
          <FormRadioGroup
            name="competences_locales"
            options={automatisationLocales}
            error={serverErrors?.competences_locales}
            defaultValue={data.competences_locales}
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