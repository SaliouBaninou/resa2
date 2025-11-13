"use server";

import { stepTwoSchema } from "@/src/shema";
import { AddDealRoutes, FormErrors } from "@/src/types/form-type";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const stepTwoFormAction = async (
  prevState: FormErrors | undefined,
  formData: FormData
): Promise<FormErrors | undefined> => {
  const rawData = Object.fromEntries(formData.entries());
  
  // Convertir les checkboxes en tableau
  const data = {
    ...rawData,
    types_automatisations: formData.getAll("types_automatisations"),
  };
  
  const validated = stepTwoSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string;
      acc[path] = issue.message;
      return acc;
    }, {} as FormErrors);

    return errors;
  }

  // Sauvegarde les données dans les cookies
  const cookieStore = await cookies();
  const existingFormData = cookieStore.get("formData")?.value 
    ? JSON.parse(cookieStore.get("formData")!.value) 
    : {};
  
  const updatedFormData = { ...existingFormData, ...validated.data };
  cookieStore.set("formData", JSON.stringify(updatedFormData), { maxAge: 60 * 60 * 24 });

  redirect(AddDealRoutes.EFFETS_AUTOMATISATION);
};
