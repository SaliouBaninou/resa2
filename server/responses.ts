"use server"

import db from "@/src/db/index"
import { responses } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import type { Response, NewResponse } from "@/src/types/db-types"

export const getResponses = async () => {
  try {
    const data = await db.select().from(responses)
    return { success: true, data }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const getResponseById = async (id: string) => {
  try {
    const result = await db.select().from(responses).where(eq(responses.id, id))
    const response = result[0]
    if (!response) return { success: false, message: "Réponse introuvable" }

    return { success: true, data: response }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const getResponsesByCompany = async (companyId: string) => {
  try {
    const data = await db.select().from(responses).where(eq(responses.companyId, companyId))
    return { success: true, data }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const createResponse = async (data: NewResponse) => {
  try {
    const [response] = await db.insert(responses).values(data).returning()
    return { success: true, data: response, message: "Réponse enregistrée" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const deleteResponse = async (id: string) => {
  try {
    await db.delete(responses).where(eq(responses.id, id))
    return { success: true, message: "Réponse supprimée" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}
