import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`block w-full rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-sm px-4 py-3 transition-all duration-200 outline-none ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-red-50/30' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-500 ml-1 font-medium animate-fade-in">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
