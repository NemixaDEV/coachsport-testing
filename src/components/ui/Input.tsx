import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-foreground text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground',
          'focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20',
          error && 'border-cinnabar',
          className
        )}
        style={{ backgroundColor: 'var(--input-background)' }}
        {...props}
      />
      {error && (
        <p className="text-cinnabar text-xs mt-1">{error}</p>
      )}
    </div>
  );
};
