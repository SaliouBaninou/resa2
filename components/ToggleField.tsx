"use client";

import { useState, useId } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ToggleFieldProps {
  label?: string;
  textLabel?: string;
  toggleRegistration?: UseFormRegisterReturn;
  textRegistration?: UseFormRegisterReturn;
  error?: string;
}

export const ToggleField = ({
  label,
  textLabel,
  toggleRegistration,
  textRegistration,
  error,
}: ToggleFieldProps) => {
  const [enabled, setEnabled] = useState(false);
  const toggleId = useId();
  const textId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(e.target.checked);
    toggleRegistration?.onChange?.(e); // envoie le changement à react-hook-form
  };

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
          checked={enabled}
          onChange={handleChange}
          {...toggleRegistration}
          className="sr-only peer"
        />
        <div
          className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer
            peer-checked:bg-blue-600 transition-all duration-300
            after:content-[''] after:absolute after:top-[3px] after:left-[3px]
            after:bg-white after:rounded-full after:h-5 after:w-5
            after:transition-all peer-checked:after:translate-x-5"
        />
      </label>

      {/* --- CHAMP TEXTE --- */}
      {enabled && (
        <div className="flex flex-col gap-1 animate-fadeIn">
          {textLabel && (
            <label htmlFor={textId} className="text-sm font-medium text-gray-700">
              {textLabel}
            </label>
          )}
          <input
            id={textId}
            type="text"
            {...textRegistration}
            className={`border rounded px-3 py-2 outline-none transition-all focus:ring-2
              ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"}
            `}
            placeholder="Entrez votre texte..."
          />
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
      )}
    </div>
  );
};
