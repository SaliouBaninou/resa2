import Link from "next/link";
import db from "@/src/db/index";
import { responses, automationDetails, companies } from "@/src/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function ResponseDetail({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const { id } = (await params) as { id: string };

  const respRows = await db
    .select({
      id: responses.id,
      companyId: responses.companyId,
      fonction: responses.fonction,
      departement: responses.departement,
      anciennete: responses.anciennete,
      procedesAutomatises: responses.procedesAutomatises,
      niveauAutomatisation: responses.niveauAutomatisation,
      impactProductivite: responses.impactProductivite,
      impactQualite: responses.impactQualite,
      competencesLocales: responses.competencesLocales,
      impactMoyenLongTerme: responses.impactMoyenLongTerme,
      recommandations: responses.recommandations,
      createdAt: responses.createdAt,
      companyName: companies.name,
    })
    .from(responses)
    .leftJoin(companies, sql`${responses.companyId} = ${companies.id}`)
    .where(eq(responses.id, id));

  const response = respRows[0];

  if (!response) return <div className="p-6">Réponse introuvable</div>;

  // trouver précédent / suivant pour navigation
  const prevRows = await db
    .select({ id: responses.id })
    .from(responses)
    .where(sql`${responses.createdAt} < ${response.createdAt}`)
    .orderBy(sql`${responses.createdAt} DESC`)
    .limit(1);
  const nextRows = await db
    .select({ id: responses.id })
    .from(responses)
    .where(sql`${responses.createdAt} > ${response.createdAt}`)
    .orderBy(sql`${responses.createdAt} ASC`)
    .limit(1);

  

  const details = await db.select().from(automationDetails).where(eq(automationDetails.responseId, id));
  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Détails de la réponse</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/reponses" className="text-sm px-3 py-1 bg-gray-200 rounded">← Retour</Link>
          {prevRows && prevRows.length > 0 && (
            <Link href={`/dashboard/reponses/${prevRows[0].id}`} className="text-sm px-3 py-1 bg-gray-200 rounded">◀ Précédent</Link>
          )}
          {nextRows && nextRows.length > 0 && (
            <Link href={`/dashboard/reponses/${nextRows[0].id}`} className="text-sm px-3 py-1 bg-gray-200 rounded">Suivant ▶</Link>
          )}
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Entreprise:</strong> {response.companyName ?? "—"}</p>
        <p><strong>Fonction:</strong> {response.fonction}</p>
        <p><strong>Département:</strong> {response.departement}</p>
        <p><strong>Ancienneté:</strong> {response.anciennete ?? "—"}</p>
        <p><strong>Procédés automatisés:</strong> {response.procedesAutomatises}</p>
        <p><strong>Niveau:</strong> {response.niveauAutomatisation}</p>
        <p><strong>Impact productivité:</strong> {response.impactProductivite ?? "—"}</p>
        <p><strong>Impact qualité:</strong> {response.impactQualite ?? "—"}</p>
        <p><strong>Compétences locales:</strong> {response.competencesLocales ?? "—"}</p>
        <p className="mt-2"><strong>Impact moyen/long terme:</strong></p>
        <div className="p-3 bg-gray-50 rounded">{response.impactMoyenLongTerme ?? "—"}</div>
        <p className="mt-2"><strong>Recommandations:</strong></p>
        <div className="p-3 bg-gray-50 rounded">{response.recommandations ?? "—"}</div>
      </div>

    <div className="bg-white p-4 rounded shadow">
  <h2 className="text-lg font-semibold mb-2">Détails d&apos;automatisation</h2>
        {details.length === 0 ? (
          <p>Pas de détails</p>
        ) : (
          <ul className="list-disc pl-6">
            {details.map((d: { id: string; type: string; label: string }) => (
              <li key={d.id}>{d.type} — {d.label}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
