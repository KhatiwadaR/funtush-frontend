// src/components/shared/forms/Select.tsx
"use client";
import React, { forwardRef, useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  searchable?: boolean;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, searchable = false, error, className = '', ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredOptions = searchable
      ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
      : options;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        
        {searchable && (
          <input
            type="text"
            placeholder="Search options..."
            className="px-3 py-1.5 text-sm border rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        <select
          ref={ref}
          className={`w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${className}`}
          {...props}
        >
          <option value="">Select an option</option>
          {filteredOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';