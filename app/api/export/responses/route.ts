import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import db from "@/src/db/index";
import { responses, companies } from "@/src/db/schema";
import { sql } from "drizzle-orm";
import { XLSX_HEADERS, mapResponseToRow } from "@/server/exportHeaders";

export async function GET() {
  try {
    // fetch responses with company name
    const rows = await db
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
      .orderBy(sql`${responses.createdAt} DESC`);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Réponses');

    // add header row
    sheet.addRow(XLSX_HEADERS);

    // need to fetch automation details per response
    for (const r of rows) {
      const details = await db.select().from(sql`automation_details`).where(sql`response_id = ${r.id}`);
      const mapped = mapResponseToRow(r, details as any[]);
      const row = XLSX_HEADERS.map((h) => mapped[h] ?? "");
      sheet.addRow(row);
    }

    const buf = await workbook.xlsx.writeBuffer();

    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="responses.xlsx"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
