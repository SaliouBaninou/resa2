import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réponses",
  description: "Consultez les réponses du questionnaire",
};

export default function ResponsesPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
