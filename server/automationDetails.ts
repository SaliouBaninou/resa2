"use server"

import db from "@/src/db/index"
import { automationDetails } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import type { NewAutomationDetail } from "@/src/types/db-types"

export const getAutomationDetails = async () => {
  try {
    const data = await db.select().from(automationDetails)
    return { success: true, data }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const getAutomationDetailsByResponse = async (responseId: string) => {
  try {
    const data = await db.select().from(automationDetails).where(eq(automationDetails.responseId, responseId))
    return { success: true, data }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const createAutomationDetail = async (data: NewAutomationDetail) => {
  try {
    const [detail] = await db.insert(automationDetails).values(data).returning()
    return { success: true, data: detail, message: "Détail ajouté avec succès" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const deleteAutomationDetail = async (id: string) => {
  try {
    await db.delete(automationDetails).where(eq(automationDetails.id, id))
    return { success: true, message: "Détail supprimé" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}
