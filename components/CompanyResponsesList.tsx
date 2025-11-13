"use client";

import * as React from "react";
import Link from "next/link";
import { ResponseActions } from "@/components/ResponseActions";

type Props = {
  companyId: string;
  initialResponses?: any[];
};

export default function CompanyResponsesList({ companyId, initialResponses = [] }: Props) {
  const [rows, setRows] = React.useState<any[]>(initialResponses);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRows = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/responses?companyId=${companyId}`);
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
    // If no initial data, fetch; otherwise keep initial and refresh in background
    if (!initialResponses.length) {
      fetchRows();
    } else {
      // refresh in background to ensure fresh data
      fetchRows();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const handleDeleted = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading && !rows.length) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-600">Erreur: {error}</div>;

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3">Fonction</th>
            <th className="p-3">Département</th>
            <th className="p-3">Procédés</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-500">Aucune réponse pour cette entreprise</td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3"><Link className="text-blue-600 hover:underline" href={`/dashboard/reponses/${r.id}`}>{r.fonction}</Link></td>
                <td className="p-3">{r.departement}</td>
                <td className="p-3">{r.procedesAutomatises}</td>
                <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="p-3"><ResponseActions id={r.id} onDeleted={() => handleDeleted(r.id)} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
