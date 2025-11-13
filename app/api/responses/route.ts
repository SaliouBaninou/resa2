"use server";

import { NextResponse } from "next/server";
import db from "@/src/db/index";
import { responses, companies } from "@/src/db/schema";
import { sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const companyId = url.searchParams.get("companyId");

    // Lister les réponses avec le nom de l'entreprise
    let q = db
      .select({
        id: responses.id,
        companyId: responses.companyId,
        fonction: responses.fonction,
        departement: responses.departement,
        anciennete: responses.anciennete,
        procedesAutomatises: responses.procedesAutomatises,
        createdAt: responses.createdAt,
        companyName: companies.name,
      })
      .from(responses)
      .leftJoin(companies, sql`${responses.companyId} = ${companies.id}`);

    if (companyId) {
      q = q.where(sql`${responses.companyId} = ${companyId}`);
    }

    const rows = await q.orderBy(sql`${responses.createdAt} DESC`);

    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
