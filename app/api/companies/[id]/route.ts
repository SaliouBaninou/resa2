import { NextResponse } from "next/server";
import { getCompanyById } from "@/server/companies";
import { getResponsesByCompany } from "@/server/responses";
import { getAutomationDetailsByResponse } from "@/server/automationDetails";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    const companyRes = await getCompanyById(id);
    if (!companyRes.success) return NextResponse.json({ success: false, error: companyRes.message }, { status: 404 });

    const responsesRes = await getResponsesByCompany(id);
    if (!responsesRes.success) return NextResponse.json({ success: false, error: responsesRes.message }, { status: 500 });

    const responses = responsesRes.data ?? [];

    // collect automation details per response and aggregate counts by type and label
    const stats: Record<string, Record<string, number>> = {};

    for (const r of responses) {
      const detailsRes = await getAutomationDetailsByResponse(r.id);
      if (!detailsRes.success) continue;
      for (const d of detailsRes.data ?? []) {
        stats[d.type] = stats[d.type] ?? {};
        stats[d.type][d.label] = (stats[d.type][d.label] ?? 0) + 1;
      }
    }

    return NextResponse.json({ success: true, data: { company: companyRes.data, responses, stats } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
