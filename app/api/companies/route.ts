import { NextResponse } from "next/server";
import { getCompanies } from "@/server/companies";

export async function GET() {
  try {
    const res = await getCompanies();
    if (!res.success) return NextResponse.json({ success: false, error: res.message }, { status: 500 });
    return NextResponse.json({ success: true, data: res.data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
