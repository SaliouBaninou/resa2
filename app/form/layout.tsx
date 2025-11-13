import type { Metadata } from "next";
import FormLayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: "Formulaire d'enquête",
  description: "Remplissez le questionnaire sur l'automatisation industrielle - RESA",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return <FormLayoutClient>{children}</FormLayoutClient>;
}
