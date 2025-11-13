"use client";

import Link from "next/link";
import { toast } from "sonner";
import * as React from "react";

export function ResponseActions({ id, onDeleted }: { id: string; onDeleted?: () => void }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    if (!confirm("Supprimer cette réponse ?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/responses/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (res.ok && json.success) {
        toast.success("Réponse supprimée");
        onDeleted?.();
      } else {
        toast.error(json?.error || "Erreur lors de la suppression");
      }
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Link href={`/dashboard/reponses/${id}`} className="text-sm px-3 py-1 bg-blue-500 text-white rounded">Voir</Link>
      <button onClick={handleDelete} disabled={loading} className="text-sm px-3 py-1 bg-red-500 text-white rounded">Supprimer</button>
    </div>
  );
}
