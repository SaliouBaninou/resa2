import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/src/db/index";
import { companies, responses, automationDetails } from "@/src/db/schema";
import { eq } from "drizzle-orm";

function parseAncienneteToMonths(input: unknown): number | null {
  if (input === undefined || input === null) return null;
  const s = String(input).trim().toLowerCase();
  if (s.length === 0) return null;

  const numMatch = s.match(/(\d+(?:[.,]\d+)?)/);
  if (!numMatch) return null;
  const value = parseFloat(numMatch[1].replace(',', '.'));

  const hasMois = /\bmois\b/.test(s);
  const hasAn = /\b(an|ans|annee|année)\b/.test(s);

  if (hasMois && !hasAn) return Math.round(value);
  if (hasAn && !hasMois) return Math.round(value * 12);

  // Ambiguë ou pas d'unité : on suppose des années (compatibilité avec l'existant)
  return Math.round(value * 12);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation des champs requis
    if (!body.company_name || !body.company_function) {
      return NextResponse.json(
        { error: "Données manquantes : nom et fonction requis" },
        { status: 400 }
      );
    }

    // 1. Créer ou récupérer l'entreprise
    let company;
    const existingCompany = await db
      .select()
      .from(companies)
      .where(eq(companies.name, body.company_name))
      .limit(1);

    if (existingCompany.length > 0) {
      company = existingCompany[0];
    } else {
      const [newCompany] = await db
        .insert(companies)
        .values({ name: body.company_name })
        .returning();
      company = newCompany;
    }

    // 2. Créer la réponse principal
    const [response] = await db
      .insert(responses)
      .values({
        companyId: company.id,
        fonction: body.company_function,
        departement: body.company_departement || "",
        // Ancienneté enregistrée en mois : conversion si l'utilisateur a saisi des années
        anciennete: parseAncienneteToMonths(body.company_anciennete),
        procedesAutomatises: body.procedes_automatisations || "",
        niveauAutomatisation: body.niveau_automatisation || null,
        impactProductivite: body.impacte_automatisation ? parseInt(body.impacte_automatisation, 10) : null,
        impactQualite: body.noncomformite_automatisation ? parseInt(body.noncomformite_automatisation, 10) : null,
        competencesLocales: body.competences_locales || null,
        impactMoyenLongTerme: body.recommandation_one_automatisation || null,
        recommandations: body.recommandation_two_automatisation || null,
      })
      .returning();

    // 3. Insérer les détails d'automatisation
    const detailsToInsert = [];

    // Types d'automatisation
    if (Array.isArray(body.types_automatisations) && body.types_automatisations.length > 0) {
      for (const type of body.types_automatisations) {
        detailsToInsert.push({
          responseId: response.id,
          type: "TYPE" as const,
          label: type,
        });
      }
    }

    // Autres automatisation
    if (body.autre_automatisation) {
      detailsToInsert.push({
        responseId: response.id,
        type: "TYPE" as const,
        label: body.autre_automatisation,
      });
    }

    // Contributions (impacts positifs)
    if (Array.isArray(body.types_utiliser_automatisation) && body.types_utiliser_automatisation.length > 0) {
      for (const contribution of body.types_utiliser_automatisation) {
        detailsToInsert.push({
          responseId: response.id,
          type: "CONTRIBUTION" as const,
          label: contribution,
        });
      }
    }

    // Autres impacts
    if (body.autre_utiliser_automatisation) {
      detailsToInsert.push({
        responseId: response.id,
        type: "CONTRIBUTION" as const,
        label: body.autre_utiliser_automatisation,
      });
    }

    // Obstacles
    if (Array.isArray(body.obstacles_automatisation) && body.obstacles_automatisation.length > 0) {
      for (const obstacle of body.obstacles_automatisation) {
        detailsToInsert.push({
          responseId: response.id,
          type: "OBSTACLE" as const,
          label: obstacle,
        });
      }
    }

    // Autres obstacles
    if (body.autre_obstacle_automatisation) {
      detailsToInsert.push({
        responseId: response.id,
        type: "OBSTACLE" as const,
        label: body.autre_obstacle_automatisation,
      });
    }

    // Insérer tous les détails en batch
    if (detailsToInsert.length > 0) {
      await db.insert(automationDetails).values(detailsToInsert);
    }

    // Nettoyage des cookies après soumission réussie
    const cookieStore = await cookies();
    cookieStore.delete("formData");

    console.log("✓ Formulaire soumis et sauvegardé en DB:", {
      companyId: company.id,
      responseId: response.id,
      detailsCount: detailsToInsert.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Formulaire soumis et enregistré avec succès",
        data: {
          companyId: company.id,
          responseId: response.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la soumission:", error);
    return NextResponse.json(
      {
        error: "Erreur serveur lors de l'enregistrement",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
