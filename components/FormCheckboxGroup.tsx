"use client";

import { useId } from "react";

interface FormCheckboxGroupProps {
  label?: string;
  name: string;
  options: { label: string; value: string }[];
  error?: string;
  defaultValue?: string[];
}

export const FormCheckboxGroup = ({ 
  label, 
  name,
  options, 
  error, 
  defaultValue 
}: FormCheckboxGroupProps) => {
  const groupId = useId();

  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700" id={`${groupId}-label`}>
          {label}
        </label>
      )}

      <div className="flex flex-wrap gap-3" role="group" aria-labelledby={`${groupId}-label`}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isChecked = defaultValue?.includes(option.value) ?? false;
          
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`
                flex items-center gap-3 cursor-pointer px-4 py-2 rounded-xl border transition-all
                ${error ? "border-red-400" : "border-gray-300 hover:border-blue-400"}
              `}
            >
              <input
                id={optionId}
                type="checkbox"
                name={name}
                value={option.value}
                defaultChecked={isChecked}
                className="peer appearance-none w-5 h-5 rounded-md border border-gray-400 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
