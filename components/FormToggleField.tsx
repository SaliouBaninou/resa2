"use client";

import { useState, useId } from "react";
import { Input } from "./Input";

interface FormToggleFieldProps {
  label?: string;
  textLabel?: string;
  toggleName: string;
  textName: string;
  error?: string;
  defaultValue?: string;
}

export const FormToggleField = ({
  label,
  textLabel,
  toggleName,
  textName,
  error,
  defaultValue,
}: FormToggleFieldProps) => {
  const [enabled, setEnabled] = useState(!!defaultValue);
  const toggleId = useId();
  const textId = useId();

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <label htmlFor={toggleId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* --- TOGGLE --- */}
      <label
        htmlFor={toggleId}
        className="relative inline-flex items-center cursor-pointer w-fit"
      >
        <input
          id={toggleId}
          type="checkbox"
          name={toggleName}
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="sr-only peer"
        />

        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />

        <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
      </label>

      {/* --- TEXTE INPUT --- */}
      {enabled && (
        <Input
          id={textId}
          label={textLabel}
          name={textName}
          placeholder={textLabel}
          defaultValue={defaultValue}
          error={error}
        />
      )}
    </div>
  );
};
