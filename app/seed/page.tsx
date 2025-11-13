"use client";

import { useState } from "react";
import { seedAll } from "@/server/seed";

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSeed = async () => {
    setLoading(true);
    const res = await seedAll();
    setResult(res);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleSeed} disabled={loading}>
        {loading ? "Seeding..." : "Lancer Seed DB"}
      </button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
