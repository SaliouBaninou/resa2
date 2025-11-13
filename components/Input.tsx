"use client";

import { useId } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export const Input = ({ label, error, registration, ...props }: InputProps) => {
  const id = useId();

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={id}
        {...registration}
        {...props}
        className={`border rounded px-3 py-2 outline-none focus:ring-2 
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"}
        `}
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
