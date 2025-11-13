import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des réponses",
  description: "Consultez et gérez toutes les réponses du questionnaire",
  robots: { index: false, follow: false },
};

export default function ResponsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
