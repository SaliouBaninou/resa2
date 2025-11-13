"use client";

import * as React from "react";

export default function CompanyAutocomplete({ 
  name = "company_name", 
  defaultValue = "", 
  error = "",
  label = "Nom de l'entreprise"
}: { 
  name?: string; 
  defaultValue?: string; 
  error?: string;
  label?: string;
}) {
  const [companies, setCompanies] = React.useState<Array<{ id: string; name: string }>>([]);
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    let mounted = true;
    fetch('/api/companies')
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        setCompanies(json.data ?? []);
      })
      .catch(() => {
        if (!mounted) return;
        setCompanies([]);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
      <input
        list="companies-list"
        id={name}
        name={name}
        className={`border rounded px-3 py-2 outline-none focus:ring-2 
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"}
        `}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      <datalist id="companies-list">
        {companies.map((c) => (
          <option key={c.id} value={c.name} />
        ))}
      </datalist>
    </div>
  );
}
