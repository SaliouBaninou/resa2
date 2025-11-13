"use server";

import { stepFiveSchema } from "@/src/shema";
import { FormErrors } from "@/src/types/form-type";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const stepFiveFormAction = async (
  prevState: FormErrors | undefined,
  formData: FormData
): Promise<FormErrors | undefined> => {
  const data = Object.fromEntries(formData.entries());
  const validated = stepFiveSchema.safeParse(data);

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

  // Redirection vers la page de revue
  redirect("/form/review"); 
};
