"use client";

import * as React from "react";
import Link from "next/link";
import { ResponseActions } from "@/components/ResponseActions";

type Row = {
  id: string;
  companyName?: string | null;
  fonction?: string;
  procedesAutomatises?: string;
  createdAt: string;
};

export default function ResponsesPageClient() {
  const [rows, setRows] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/responses");
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json = await res.json();
      setRows(json.data ?? []);
    } catch (e) {
      setError((e as Error).message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRows();
  }, []);

  const handleDeleted = (id: string) => {
    // remove locally to give immediate feedback
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Réponses</h1>

      {loading && <div>Chargement...</div>}
      {error && <div className="text-red-600">Erreur: {error}</div>}

      <div className="mb-4 flex justify-end">
        <a href="/api/export/responses" className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded">Exporter XLSX</a>
      </div>

      {!loading && !error && (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3">Entreprise</th>
                <th className="p-3">Fonction</th>
                <th className="p-3">Procédés</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">Aucune réponse</td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <Link href={`/dashboard/reponses/${r.id}`} className="text-blue-600 hover:underline">{r.companyName ?? "—"}</Link>
                    </td>
                    <td className="p-3">{r.fonction}</td>
                    <td className="p-3">{r.procedesAutomatises}</td>
                    <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
                    <td className="p-3">
                      <ResponseActions id={r.id} onDeleted={() => handleDeleted(r.id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
