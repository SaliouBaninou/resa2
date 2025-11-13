"use client";

import { useId } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export const TextArea = ({ label, error, registration, ...props }: TextAreaProps) => {
  const id = useId();

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        {...registration}
        {...props}
        className={`border rounded-xl px-3 py-2 outline-none bg-white text-gray-700 resize-none
          focus:ring-2 transition-all
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600 hover:border-blue-400"}
        `}
        rows={props.rows || 4}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
