// store/formStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FormData {
  company_name?: string;
  company_function?: string;
  company_departement?: string;
  company_anciennete?: string;
  procedes_automatisations?: string;
  types_automatisations?: string[];
  autre_automatisation?: string;
  niveau_automatisation?: string;
  impacte_automatisation?: string;
  noncomformite_automatisation?: string;
  types_utiliser_automatisation?: string[];
  autre_utiliser_automatisation?: string;
  obstacles_automatisation?: string[];
  autre_obstacle_automatisation?: string;
  competences_locales?: string;
  recommandation_one_automatisation?: string;
  recommandation_two_automatisation?: string;
}

interface FormStore {
  data: FormData;
  updateData: (values: Partial<FormData>) => void;
  resetData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      data: {},
      currentStep: 1,
      updateData: (values) =>
        set((state) => ({
          data: { ...state.data, ...values },
        })),
      resetData: () => set({ data: {}, currentStep: 1 }),
      setCurrentStep: (step) => set({ currentStep: step }),
    }),
    {
      name: "form-storage",
    }
  )
);
