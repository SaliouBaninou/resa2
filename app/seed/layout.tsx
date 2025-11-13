import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Initialisation des données",
  description: "Page d'initialisation des données de test",
  robots: { index: false, follow: false },
};

export default function SeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
