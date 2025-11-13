"use server";

import db from "@/src/db";
import { companies, responses, automationDetails } from "@/src/db/schema";
import type { NewCompany, NewResponse, NewAutomationDetail } from "@/src/types/db-types";
import { signUp } from "./users";

// ==========================
// 1️⃣ Entreprises
// ==========================

await signUp()

const companiesData: NewCompany[] = [
  { name: "ENTREPRISE 1" },
  { name: "ENTREPRISE 2" },
  { name: "ENTREPRISE 3" },
  { name: "ENTREPRISE 4" },
];

// ==========================
// 2️⃣ Réponses liées
// ==========================
const responsesData = (companyIds: string[]): NewResponse[] => [
  {
    companyId: companyIds[0],
    fonction: "INGENIEUR INSPECTION",
    departement: "INTEGRITE",
    anciennete: 12,
    procedesAutomatises: "OUI (PARTIELLEMENT)",
    niveauAutomatisation: "BON",
    impactProductivite: 4,
    impactQualite: 4,
    competencesLocales: "OUI MAIS LIMITEES",
    impactMoyenLongTerme: "AMELIORATION DE LA PRODUCTIVITE",
    recommandations:
      "METTRE EN PLACE DES PROGRAMMES DE FORMATION LOCALE SUR LES SYSTEMES AUTOMATISES",
  },
  {
    companyId: companyIds[1],
    fonction: "ELECTROMECANICIEN",
    departement: "MAINTENANCE",
    anciennete: 0,
    procedesAutomatises: "OUI (PARTIELLEMENT)",
    niveauAutomatisation: "ELEVE",
    impactProductivite: 5,
    impactQualite: 5,
    competencesLocales: "OUI MAIS LIMITEES",
    impactMoyenLongTerme: "PRODUCTIVITE ACCRUE",
    recommandations:
      "RENFORCER LA FORMATION, DIVERSIFICATION DE L'ECONOMIE, CREATION D'OPPORTUNITES",
  },
  {
    companyId: companyIds[2],
    fonction: "INGENIEUR PROJET",
    departement: "PROJET",
    anciennete: 84,
    procedesAutomatises: "OUI (PARTIELLEMENT)",
    niveauAutomatisation: "NON PRECISE",
    impactProductivite: 4,
    impactQualite: 3,
    competencesLocales: "OUI MAIS LIMITEES",
    impactMoyenLongTerme: "AUGMENTATION DU TAUX DE CHOMAGE",
    recommandations:
      "FORMER LE PERSONNEL EN EXPLOITATION ET MAINTENANCE POUR AMELIORER LA PRODUCTION ET LA SECURITE",
  },
  {
    companyId: companyIds[3],
    fonction: "AGENT HSE",
    departement: "HSE",
    anciennete: 24,
    procedesAutomatises: "OUI (PARTIELLEMENT)",
    niveauAutomatisation: "MOYEN",
    impactProductivite: 4,
    impactQualite: 4,
    competencesLocales: "OUI MAIS LIMITEES",
    impactMoyenLongTerme: "AMELIORATION DE LA PRODUCTIVITE",
    recommandations:
      "CONVERTIR DANS LA FORMATION, DEVELOPPER LES COMPETENCES EN PROGRAMMATION",
  },
];

// ==========================
// 3️⃣ Détails d’automatisation
// ==========================
const automationDetailsData = (responsesIds: string[]): NewAutomationDetail[] => [
  // ENTREPRISE 1
  { responseId: responsesIds[0], type: "TYPE", label: "AUTOMATES PROGRAMMABLES" },
  { responseId: responsesIds[0], type: "TYPE", label: "CHAINES ROBOTISES" },
  { responseId: responsesIds[0], type: "TYPE", label: "SYSTEMES DE CONTRÔLE/MONITORING" },
  { responseId: responsesIds[0], type: "CONTRIBUTION", label: "REDUCTION DES COUTS" },
  { responseId: responsesIds[0], type: "CONTRIBUTION", label: "RAPIDITE D'EXECUTION" },
  { responseId: responsesIds[0], type: "OBSTACLE", label: "COUTS ELEVES D'INVESTISSEMENTS" },
  { responseId: responsesIds[0], type: "OBSTACLE", label: "MANQUE DU PERSONNEL QUALIFIE" },

  // ENTREPRISE 2
  { responseId: responsesIds[1], type: "TYPE", label: "AUTOMATES PROGRAMMABLES" },
  { responseId: responsesIds[1], type: "TYPE", label: "CHAINES ROBOTISEES" },
  { responseId: responsesIds[1], type: "TYPE", label: "SYSTEMES DE CONTRÔLE/MONITORING" },
  { responseId: responsesIds[1], type: "CONTRIBUTION", label: "REDUCTION DES COUTS" },
  { responseId: responsesIds[1], type: "CONTRIBUTION", label: "RAPIDITE D'EXECUTION" },
  { responseId: responsesIds[1], type: "OBSTACLE", label: "COUTS ELEVES D'INVESTISSEMENTS" },
  { responseId: responsesIds[1], type: "OBSTACLE", label: "MANQUE DE PERSONNEL QUALIFIE" },

  // ENTREPRISE 3
  { responseId: responsesIds[2], type: "TYPE", label: "AUTOMATES PROGRAMMABLES" },
  { responseId: responsesIds[2], type: "TYPE", label: "CHAINES ROBOTISEES" },
  { responseId: responsesIds[2], type: "TYPE", label: "SYSTEMES DE CONTRÔLE/MONITORING" },
  { responseId: responsesIds[2], type: "CONTRIBUTION", label: "REDUCTION DES COUTS" },
  { responseId: responsesIds[2], type: "CONTRIBUTION", label: "RAPIDITE" },
  { responseId: responsesIds[2], type: "OBSTACLE", label: "COUTS ELEVES" },
  { responseId: responsesIds[2], type: "OBSTACLE", label: "MANQUE DE PERSONNEL" },

  // ENTREPRISE 4
  { responseId: responsesIds[3], type: "TYPE", label: "AUTOMATES PROGRAMMABLES" },
  { responseId: responsesIds[3], type: "TYPE", label: "CHAINES ROBOTISEES" },
  { responseId: responsesIds[3], type: "TYPE", label: "SYSTEMES DE CONTRÔLE/MONITORING" },
  { responseId: responsesIds[3], type: "CONTRIBUTION", label: "REDUCTION DES COUTS" },
  { responseId: responsesIds[3], type: "CONTRIBUTION", label: "AMELIORER LA RAPIDITE D'EXECUTION" },
  { responseId: responsesIds[3], type: "OBSTACLE", label: "COUTS ELEVES D'INVESTISSEMENT" },
  { responseId: responsesIds[3], type: "OBSTACLE", label: "MANQUE DE PERSONNEL QUALIFIE" },
];

// ==========================
// Fonction principale de seed
// ==========================
export const seedAll = async () => {
  try {
    // 1️⃣ Companies
    const insertedCompanies = await db.insert(companies).values(companiesData).returning();
    const companyIds = insertedCompanies.map((c) => c.id);

    // 2️⃣ Responses
    const insertedResponses = await db
      .insert(responses)
      .values(responsesData(companyIds))
      .returning();
    const responseIds = insertedResponses.map((r) => r.id);

    // 3️⃣ AutomationDetails
    const insertedDetails = await db
      .insert(automationDetails)
      .values(automationDetailsData(responseIds))
      .returning();

    return {
      success: true,
      message: "Seed completed successfully",
      companies: insertedCompanies,
      responses: insertedResponses,
      automationDetails: insertedDetails,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
