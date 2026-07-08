// src/components/shared/forms/Checkbox.tsx
import React, { forwardRef, useEffect, useRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate, className = '', ...props }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref || defaultRef) as React.MutableRefObject<HTMLInputElement | null>;

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = !!indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          ref={resolvedRef}
          className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all ${className}`}
          {...props}
        />
        {label && <span className="text-sm text-gray-700 font-medium">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';