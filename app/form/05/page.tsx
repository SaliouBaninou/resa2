"use client";

import { TextArea } from "@/components/TextArea";
import PrevBtn from "@/components/PrevBtn";
import { FormErrors } from "@/src/types/form-type";
import { useFormStore } from "@/src/store/formStore";
import * as React from "react";
import { stepFiveFormAction } from "./actions";

const initialState: FormErrors = {};

export default function Step05() {
  const { data, updateData } = useFormStore();
  const [serverErrors, formAction] = React.useActionState(stepFiveFormAction, initialState);

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
        Perspectives et recommandations
      </h1>

      <div className="space-y-10">
        {/* --- Impact supplémentaire --- */}
        <div>
          <h2 className="text-lg font-semibold">A moyen et long terme, quel impact supplémentaire l&apos;automatisation pourrait-elle avoir sur votre entreprise?</h2>
          <div className="mt-4 space-y-4">
            <TextArea
              label=""
              name="recommandation_one_automatisation"
              placeholder="Rédigez votre réponse..."
              defaultValue={data.recommandation_one_automatisation}
              error={serverErrors?.recommandation_one_automatisation}
            />
          </div>
        </div>

        {/* --- Recommandations --- */}
        <div>
          <h2 className="text-lg font-semibold">Quelles recommandations feriez-vous pour renforcer l&apos;efficacité de l&apos;automatisation dans l&apos;industrie gabonaise ?</h2>
          <div className="mt-4 space-y-4">
            <TextArea
              label=""
              name="recommandation_two_automatisation"
              placeholder="Rédigez votre réponse..."
              defaultValue={data.recommandation_two_automatisation}
              error={serverErrors?.recommandation_two_automatisation}
            />
          </div>
        </div>
      </div>

      {/* --- Boutons de navigation --- */}
      <div className="flex justify-between mt-6">
        <PrevBtn />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Voir le résumé
        </button>
      </div>
    </form>
  );
}