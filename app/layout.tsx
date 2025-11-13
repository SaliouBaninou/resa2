import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - RESA",
    default: "Questionnaire RESA - Étude Comparative",
  },
  description: "Questionnaire académique évaluant l'impact de l'automatisation sur la production industrielle au Gabon",
  keywords: ["automatisation", "questionnaire", "enquête", "Gabon", "industrie", "RESA"],
  authors: [{ name: "RESA" }],
  creator: "RESA",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Questionnaire d'enquête - RESA",
    description: "Questionnaire académique évaluant l'impact de l'automatisation sur la production industrielle au Gabon",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>

        {/* Contenu principal */}
        <main className="min-h-screen">
          {children}
        </main>

        <Toaster />
      </body>
    </html>
  );
}
