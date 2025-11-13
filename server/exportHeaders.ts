// Configure here the exact order and labels you want in the exported XLSX.
// Example default mapping — replace with the exact headers from your Excel file.
// Headers matching the Excel file provided by the user
export const XLSX_HEADERS = [
  "ENTREPRISES",
  "FONCTIONS",
  "DEPARTEMENTS SERVICES",
  "ANCIENNETE",
  "PROCEDES AUTOMATISES DANS LA PRODUCTION",
  "TYPES D'AUTOMATISATION UTILISES",
  "NIVEAU D'AUTOMATISATION ACTUEL",
  "IMPACT SUR LA PRODUCTIVITE (echelle de 1-5)",
  "IMPACT SUR LA QUALITE (echelle de 1-5)",
  "CONTRIBUTION DE L'AUTOMATISATION",
  "OBSTACLES PRINCIPAUX",
  "COMPETENCES LOCALES SUFFISANTES",
  "IMPACTS MOYENS/ LONG TERME ATTENDU",
  "RECOMMANDATIONS",
];

// Mapping function: from DB response object and automation details to row matching XLSX_HEADERS order.
export function mapResponseToRow(r: any, details: Array<{ type: string; label: string }>) {
  const byType: Record<string, string[]> = {};
  for (const d of details ?? []) {
    byType[d.type] = byType[d.type] ?? [];
    byType[d.type].push(d.label);
  }

  // Join multiple values with semicolon
  const types = (byType['TYPE'] ?? []).join('; ');
  const contributions = (byType['CONTRIBUTION'] ?? []).join('; ');
  const obstacles = (byType['OBSTACLE'] ?? []).join('; ');

  return {
    "ENTREPRISES": r.companyName ?? "",
    "FONCTIONS": r.fonction ?? "",
    "DEPARTEMENTS SERVICES": r.departement ?? "",
    "ANCIENNETE": r.anciennete ?? "",
    "PROCEDES AUTOMATISES DANS LA PRODUCTION": r.procedesAutomatises ?? "",
    "TYPES D'AUTOMATISATION UTILISES": types,
    "NIVEAU D'AUTOMATISATION ACTUEL": r.niveauAutomatisation ?? "",
    "IMPACT SUR LA PRODUCTIVITE (echelle de 1-5)": r.impactProductivite ?? "",
    "IMPACT SUR LA QUALITE (echelle de 1-5)": r.impactQualite ?? "",
    "CONTRIBUTION DE L'AUTOMATISATION": contributions,
    "OBSTACLES PRINCIPAUX": obstacles,
    "COMPETENCES LOCALES SUFFISANTES": r.competencesLocales ?? "",
    "IMPACTS MOYENS/ LONG TERME ATTENDU": r.impactMoyenLongTerme ?? "",
    "RECOMMANDATIONS": r.recommandations ?? "",
  };
}
