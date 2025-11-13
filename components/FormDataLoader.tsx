"use client";

import { useFormStore } from "@/src/store/formStore";
import type { FormData } from "@/src/store/formStore";
import { useEffect } from "react";

export function FormDataLoader() {
  const { updateData } = useFormStore();

  useEffect(() => {
    // Charger les données depuis le localStorage (utilisé par Zustand persist)
    const storedData = localStorage.getItem("form-storage");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);

        // Zustand persist peut stocker soit { state: { ... } } soit directement l'objet d'état
        // Gérer plusieurs formes pour être robuste
        const fromState = parsed.state ?? parsed;

        // Si l'objet a une clé `data`, l'utiliser. Sinon, utiliser l'objet entier.
        const payload = fromState.data ?? fromState;

        if (payload && typeof payload === "object") {
          // payload peut être un sous-ensemble du FormData
          updateData(payload as Partial<FormData>);
        }
      } catch (e) {
        console.error("Erreur lors du chargement des données du formulaire:", e);
      }
    }
  }, [updateData]);

  return null;
}
