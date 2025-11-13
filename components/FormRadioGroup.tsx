"use client";

import { useId } from "react";

interface FormRadioGroupProps {
  label?: string;
  name: string;
  options: { label: string; value: string }[];
  error?: string;
  defaultValue?: string;
}

export const FormRadioGroup = ({ 
  label, 
  name,
  options, 
  error, 
  defaultValue 
}: FormRadioGroupProps) => {
  const groupId = useId();

  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700" id={`${groupId}-label`}>
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-4" role="radiogroup" aria-labelledby={`${groupId}-label`}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition
                ${error ? "border-red-400" : "border-gray-300 hover:border-blue-500"}
              `}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                defaultChecked={defaultValue === option.value}
                className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
              />
              <span className="text-gray-700 text-sm">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
