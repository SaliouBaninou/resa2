"use server";

import { NextRequest, NextResponse } from "next/server";
import db from "@/src/db/index";
import { responses, automationDetails } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const resRows = await db.select().from(responses).where(eq(responses.id, id));
    const response = resRows[0];
    if (!response)
      return NextResponse.json({ success: false, error: "Réponse introuvable" }, { status: 404 });

    const details = await db.select().from(automationDetails).where(eq(automationDetails.responseId, id));

    return NextResponse.json({ success: true, data: { response, details } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    await db.delete(automationDetails).where(eq(automationDetails.responseId, id));
    await db.delete(responses).where(eq(responses.id, id));

    return NextResponse.json({ success: true, message: "Réponse supprimée" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
