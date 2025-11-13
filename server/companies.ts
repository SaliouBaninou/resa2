"use server"

import db from "@/src/db/index"
import { companies, responses } from "@/src/db/schema"
import { eq, sql } from "drizzle-orm"
import type { Company, NewCompany } from "@/src/types/db-types"

export const getCompanies = async (): Promise<{ success: boolean; data?: Company[]; message?: string }> => {
  try {
    const data = await db.select().from(companies)
    return { success: true, data }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}



export const getCompaniesWithNumberOfResponses = async (): Promise<{ success: boolean; data?: (Company & { numberOfResponses: number })[]; message?: string }> => {
  try {
    const data = await db
      .select({
        id: companies.id,
        name: companies.name,
        createdAt: companies.createdAt,
        numberOfResponses: sql<number>`COUNT(${responses.id})`
      })
      .from(companies)
      .leftJoin(responses, eq(companies.id, responses.companyId))
      .groupBy(companies.id)

    return { success: true, data }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}


export const getCompanyById = async (id: string) => {
  try {
    const result = await db.select().from(companies).where(eq(companies.id, id))
    const company = result[0]
    if (!company) return { success: false, message: "Entreprise introuvable" }

    return { success: true, data: company }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const createCompany = async (data: NewCompany) => {
  try {
    const [company] = await db.insert(companies).values(data).returning()
    return { success: true, data: company, message: "Entreprise créée avec succès" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export const deleteCompany = async (id: string) => {
  try {
    await db.delete(companies).where(eq(companies.id, id))
    return { success: true, message: "Entreprise supprimée avec succès" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}
