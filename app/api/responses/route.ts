import { NextResponse } from "next/server";
import db from "@/src/db/index";
import { responses, companies } from "@/src/db/schema";
import { sql } from "drizzle-orm";

interface ResponseQueryParams {
  companyId?: string;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const companyId = url.searchParams.get("companyId") || undefined;

    // Construire la requête avec condition optionnelle
    const rows = await (
      companyId
        ? db
            .select({
              id: responses.id,
              companyId: responses.companyId,
              fonction: responses.fonction,
              departement: responses.departement,
              anciennete: responses.anciennete,
              procedesAutomatises: responses.procedesAutomatises,
              niveauAutomatisation: responses.niveauAutomatisation,
              impactProductivite: responses.impactProductivite,
              impactQualite: responses.impactQualite,
              competencesLocales: responses.competencesLocales,
              impactMoyenLongTerme: responses.impactMoyenLongTerme,
              recommandations: responses.recommandations,
              createdAt: responses.createdAt,
              companyName: companies.name,
            })
            .from(responses)
            .leftJoin(companies, sql`${responses.companyId} = ${companies.id}`)
            .where(sql`${responses.companyId} = ${companyId}`)
        : db
            .select({
              id: responses.id,
              companyId: responses.companyId,
              fonction: responses.fonction,
              departement: responses.departement,
              anciennete: responses.anciennete,
              procedesAutomatises: responses.procedesAutomatises,
              niveauAutomatisation: responses.niveauAutomatisation,
              impactProductivite: responses.impactProductivite,
              impactQualite: responses.impactQualite,
              competencesLocales: responses.competencesLocales,
              impactMoyenLongTerme: responses.impactMoyenLongTerme,
              recommandations: responses.recommandations,
              createdAt: responses.createdAt,
              companyName: companies.name,
            })
            .from(responses)
            .leftJoin(companies, sql`${responses.companyId} = ${companies.id}`)
    ).orderBy(sql`${responses.createdAt} DESC`);

    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
