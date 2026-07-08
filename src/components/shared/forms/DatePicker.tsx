// src/components/shared/forms/DatePicker.tsx
import React, { forwardRef } from 'react';

interface DatePickerProps {
  label?: string;
  isRange?: boolean;
  error?: string;
  onChange: (dates: { start: string; end?: string }) => void;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, isRange = false, error, onChange }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="flex gap-2">
          <input
            type="date"
            ref={ref}
            title={label || 'Start date'}
            aria-label={label || 'Start date'}
            name="startDate"
            className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
            onChange={(e) => onChange({ start: e.target.value })}
          />
          {isRange && (
            <input
              type="date"
              title="End date"
              aria-label="End date"
              name="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onChange({ start: '', end: e.target.value })}
            />
          )}
        </div>
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';