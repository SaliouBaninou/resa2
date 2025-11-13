"use client";

import { useId } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  options: { label: string; value: string }[];
}

export const Select = ({ label, error, registration, options, ...props }: SelectProps) => {
  const id = useId();

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        id={id}
        {...registration}
        {...props}
        className={`border rounded-xl px-3 py-2 outline-none bg-white text-gray-700
          focus:ring-2 transition-all
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600 hover:border-blue-400"}
        `}
      >
        <option value="">-- Sélectionner --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
