export const dynamic = "force-dynamic";

import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "@/src/app/dashboard/data.json";

import db from "@/src/db/index";
import { companies, responses, automationDetails } from "@/src/db/schema";
import { sql } from "drizzle-orm";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

export default async function DasboardPage() {
  // Calculer quelques statistiques simples côté serveur
  const companiesCountRes = await db.select({ count: sql`COUNT(${companies.id})` }).from(companies);
  const compRow = (companiesCountRes && companiesCountRes[0]) as { count?: number | string } | undefined;
  const totalCompanies = Number(compRow?.count ?? 0);

  const responsesCountRes = await db.select({ count: sql`COUNT(${responses.id})` }).from(responses);
  const respRow = (responsesCountRes && responsesCountRes[0]) as { count?: number | string } | undefined;
  const totalResponses = Number(respRow?.count ?? 0);

  // Top obstacles
  const topObstacles = await db
    .select({ label: automationDetails.label, count: sql`COUNT(${automationDetails.id})` })
    .from(automationDetails)
    .where(sql`${automationDetails.type} = 'OBSTACLE'`)
    .groupBy(automationDetails.label)
    .orderBy(sql`COUNT(${automationDetails.id}) DESC`)
    .limit(5);

  // Top types
  const topTypes = await db
    .select({ label: automationDetails.label, count: sql`COUNT(${automationDetails.id})` })
    .from(automationDetails)
    .where(sql`${automationDetails.type} = 'TYPE'`)
    .groupBy(automationDetails.label)
    .orderBy(sql`COUNT(${automationDetails.id}) DESC`)
    .limit(5);

  const mostCommonObstacles = (topObstacles as unknown as { label: string; count: number | string }[]).map((r) => ({ label: r.label, count: Number(r.count) }));
  const mostCommonTypes = (topTypes as unknown as { label: string; count: number | string }[]).map((r) => ({ label: r.label, count: Number(r.count) }));

  const stats = {
    totalCompanies,
    totalResponses,
    mostCommonObstacles,
    mostCommonTypes,
  };

  // build time series for last 90 days: counts per day (responses and distinct companies)
  const seriesRows = await db
    .select({ day: sql`date_trunc('day', ${responses.createdAt})`, responses_count: sql`COUNT(${responses.id})`, companies_count: sql`COUNT(DISTINCT ${responses.companyId})` })
    .from(responses)
    .where(sql`${responses.createdAt} >= now() - interval '90 days'`)
    .groupBy(sql`date_trunc('day', ${responses.createdAt})`)
    .orderBy(sql`date_trunc('day', ${responses.createdAt}) ASC`);

  const chartSeries = (seriesRows as { day: Date; responses_count: number | string; companies_count: number | string }[]).map((r) => ({
    date: new Date(r.day).toISOString().slice(0, 10),
    responses: Number(r.responses_count ?? 0),
    companies: Number(r.companies_count ?? 0),
  }));

  return (
    <>
      <SectionCards stats={stats} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive serverData={chartSeries} />
      </div>
      <DataTable data={data} />
    </>
  );
}
