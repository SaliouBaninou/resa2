"use client";

import { Input } from "@/components/Input";
import CompanyAutocomplete from "@/components/CompanyAutocomplete";
import NextBtn from "@/components/NextBtn";
import { FormErrors } from "@/src/types/form-type";
import { useFormStore } from "@/src/store/formStore";
import type { FormData } from "@/src/store/formStore";
import * as React from "react";
import { stepOneFormAction } from "./actions";

const initialState: FormErrors = {};

export default function Step01() {
  const { data, updateData } = useFormStore();
  const [serverErrors, formAction] = React.useActionState(stepOneFormAction, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Ne pas empêcher l'envoi : on met à jour le store avant que l'action côté serveur ne s'exécute
    const form = e.currentTarget;
    const fd = new FormData(form);
    const entries = Array.from(fd.entries());
    const payload: Record<string, unknown> = {};
    for (const [k, v] of entries) {
      if (Object.prototype.hasOwnProperty.call(payload, k)) {
        if (Array.isArray(payload[k])) payload[k].push(v);
        else payload[k] = [payload[k], v];
      } else {
        payload[k] = v;
      }
    }
    updateData(payload as Partial<FormData>);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="md:w-1/2 mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-blue-700">
        Informations sur l’entreprise
      </h1>

      <div className="space-y-4">
        <CompanyAutocomplete
          name="company_name"
          defaultValue={data.company_name}
          error={serverErrors?.company_name}
          label="Nom de l'entreprise"
        />
        <Input
          label="Fonction dans l&apos;entreprise"
          id="company_function"
          name="company_function"
          defaultValue={data.company_function}
          error={serverErrors?.company_function}
        />
        <Input
          label="Département/Service"
          id="company_departement"
          name="company_departement"
          defaultValue={data.company_departement}
          error={serverErrors?.company_departement}
        />
        <Input
          label="Ancienneté dans l&apos;entreprise"
          id="company_anciennete"
          name="company_anciennete"
          placeholder="exemple 7 ans"
          defaultValue={data.company_anciennete}
          error={serverErrors?.company_anciennete}
        />
      </div>

      <div className="flex justify-end mt-6">
        <NextBtn />
      </div>
    </form>
  );
}
