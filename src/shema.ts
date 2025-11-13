import { z } from "zod";

export const stepOneSchema = z.object({
  company_name: z.string().min(3, "Le nom de l'entreprise doit contenir au moins 3 caractères"),
  company_function: z.string().min(3, "La fonction de l'entreprise doit contenir au moins 3 caractères"),
  company_departement: z.string().min(3, "Le département de l'entreprise doit contenir au moins 3 caractères"),
  company_anciennete: z.string().min(3, "L'ancienneté de l'entreprise doit contenir au moins 3 caractères"),
});

export const stepTwoSchema = z.object({
  procedes_automatisations: z.string().nonempty("Veuillez choisir une réponse"),
  types_automatisations: z.array(z.string()).optional(),
  autre_automatisation: z.string().optional(),
  niveau_automatisation: z.string().nonempty("Veuillez choisir une réponse"),
}).refine(
  (data) => {
    const hasTypes = data.types_automatisations && data.types_automatisations.length > 0;
    const hasAutre = data.autre_automatisation && data.autre_automatisation.trim() !== "";
    return hasTypes || hasAutre;
  },
  {
    message: "Veuillez choisir au moins un type d’automatisation ou en préciser un autre.",
    path: ["types_automatisations"],
  }
);

export const stepThreeSchema = z.object({
  impacte_automatisation: z.string().nonempty("Veuillez choisir une réponse"),
  noncomformite_automatisation: z.string().nonempty("Veuillez choisir une réponse"),
  types_utiliser_automatisation: z.array(z.string()).optional(),
  autre_utiliser_automatisation: z.string().optional(),
}).refine(
  (data) => {
    const hasTypes = data.types_utiliser_automatisation && data.types_utiliser_automatisation.length > 0;
    const hasAutre = data.autre_utiliser_automatisation && data.autre_utiliser_automatisation.trim() !== "";
    return hasTypes || hasAutre;
  },
  {
    message: "Veuillez sélectionner au moins un type ou préciser un autre moyen d’automatisation.",
    path: ["types_utiliser_automatisation"],
  }
);

export const stepFourSchema = z.object({
  obstacles_automatisation: z.array(z.string()).optional(),
  autre_obstacle_automatisation: z.string().optional(),
  competences_locales: z.string().nonempty("Veuillez choisir une réponse"),
}).refine(
  (data) => {
    const hasObstacles = data.obstacles_automatisation && data.obstacles_automatisation.length > 0;
    const hasAutre = data.autre_obstacle_automatisation && data.autre_obstacle_automatisation.trim() !== "";
    return hasObstacles || hasAutre;
  },
  {
    message: "Veuillez sélectionner au moins un obstacle ou en préciser un autre.",
    path: ["obstacles_automatisation"],
  }
);

export const stepFiveSchema = z.object({
  recommandation_one_automatisation: z.string().min(3, "La recommandation doit contenir au moins 3 caractères"),
  recommandation_two_automatisation: z.string().min(3, "La recommandation doit contenir au moins 3 caractères"),
});

export const newDealSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema)
  .merge(stepFiveSchema);

export const NewDealInitialValues = newDealSchema.partial();

export type NewDealType = z.infer<typeof newDealSchema>;
export type NewDealInitialValuesType = z.infer<typeof NewDealInitialValues>;
